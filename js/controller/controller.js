goog.provide('controller');
goog.require('goog.dom');
goog.require('goog.net.XhrIo');


/**
 * Base url for StackOverflow API.
 */
controller.BASE_URL = 'https://api.stackexchange.com/2.1/';

/**
 * Url to use for searching StackOverflow answers, just append search text.
 */
controller.SEARCH_URL =
  controller.BASE_URL + 'search?order=desc&sort=activity&intitle=';

/**
 * Specifies using the StackOverflow site for API requests.
 */
controller.SITE_URL = '&site=stackoverflow';

/**
 * Search StackExchange site based on text in the search bar.
 */
controller.search = function() {
  var searchBar = document.getElementById('search-bar');
  searchUrl = controller.buildSearchUrl(searchBar.value);
  console.log('searchUrl: ' + searchUrl);
  data = controller.getData(searchUrl);
};

/**
 * Build a search url.
 * @param {string} searchText The text to use in the search.
 * @return {string} The query url for the StackExchange API.
 */
controller.buildSearchUrl = function(searchText) {
  console.log('searchText: ' + searchText);
  return controller.SEARCH_URL + searchText + controller.SITE_URL;
};

/**
 * Retrieve JSON data using XhrIo's static send() method.
 *
 * @param {string} dataUrl The url to request.
 * @this The controller.
 */
controller.getData = function(dataUrl) {
  controller.log('Sending simple request for [' + dataUrl + ']');
  fn = goog.bind(this.parseAndDisplayResults, this);
  callback = goog.bind(this.callbackWrapper, this, fn);
  goog.net.XhrIo.send(dataUrl, callback);
};

/**
 * Wrapper to use as a callback for Xhr's.
 * @param {Function} fn Function to call the parsed JSON obj on.
 * @param {*} e Callback response event.
 */
controller.callbackWrapper = function(fn, e) {
  console.log('callbackWrapper called fn: ' + fn + ' e: ' + e);
  var xhr = e.target;
  var obj = xhr.getResponseJson();
  fn(obj);
};

/**
 * Parses a response object containing StackOverflow questions and displays
 * the results.
 * @param {*} obj The JSON object to parse.
 * @this The controller.
 */
controller.parseAndDisplayResults = function(obj) {
  if (obj.length == 0) {
    return;
  }
  var results = obj['items'];
  this.clearResults();
  for (var i in results) {
    var result = results[i];
    this.appendResult(result);
  }
};

/**
 * Add a result to the results list.
 * @param {*} result The result to append.
 */
controller.appendResult = function(result) {
  var title = result['title'];
  var p = document.createElement('li');
  goog.dom.append(p, title);
  var resultsListEl = document.getElementById('results-list');
  goog.dom.append(resultsListEl, p);
};

/**
 * Clear all results from the result list.
 */
controller.clearResults = function() {
  var resultsListEl = document.getElementById('results-list');
  goog.dom.removeChildren(resultsListEl);
};

/**
 * Simple log function, appends text to the end of a page.
 * @param {string} msg The message to log.
 */
controller.log = function(msg) {
  document.getElementById('log').appendChild(document.createTextNode(msg));
  document.getElementById('log').appendChild(document.createElement('br'));
};
