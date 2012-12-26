goog.provide('Controller');

goog.require('goog.dom');
goog.require('goog.net.XhrIo');


/**
 * Base url for StackOverflow API.
 */
Controller.BASE_URL = 'https://api.stackexchange.com/2.1/';

/**
 * Url to use for searching StackOverflow answers, just append search text.
 */
Controller.SEARCH_URL =
  Controller.BASE_URL + 'search?order=desc&sort=activity&intitle=';

/**
 * Specifies using the StackOverflow site for API requests.
 */
Controller.SITE_URL = '&site=stackoverflow';

/**
 * Class for driving the StackOverflow application.
 * @constructor
 */
Controller = function() {
};

/**
 * The last text searched for. Used to prevent sending duplicate requests.
 * @param {string}
 */
Controller.prototype.lastSearchText = '';

/**
 * Search StackExchange site based on text in the search bar.
 */
Controller.search = function() {
  var searchBar = document.getElementById('search-bar');
  searchUrl = Controller.buildSearchUrl(searchBar.value);
  console.log('searchUrl: ' + searchUrl);
  data = Controller.getData(searchUrl);
};

/**
 * Build a search url.
 * @param {string} searchText The text to use in the search.
 * @return {string} The query url for the StackExchange API.
 */
Controller.buildSearchUrl = function(searchText) {
  console.log('searchText: ' + searchText);
  return Controller.SEARCH_URL + searchText + Controller.SITE_URL;
};

/**
 * Retrieve JSON data using XhrIo's static send() method.
 *
 * @param {string} dataUrl The url to request.
 * @this The Controller.
 */
Controller.getData = function(dataUrl) {
  Controller.log('Sending simple request for [' + dataUrl + ']');
  fn = goog.bind(this.parseAndDisplayResults, this);
  callback = goog.bind(this.callbackWrapper, this, fn);
  goog.net.XhrIo.send(dataUrl, callback);
};

/**
 * Wrapper to use as a callback for Xhr's.
 * @param {Function} fn Function to call the parsed JSON obj on.
 * @param {*} e Callback response event.
 */
Controller.callbackWrapper = function(fn, e) {
  console.log('callbackWrapper called fn: ' + fn + ' e: ' + e);
  var xhr = e.target;
  var obj = xhr.getResponseJson();
  fn(obj);
};

/**
 * Parses a response object containing StackOverflow questions and displays
 * the results.
 * @param {*} obj The JSON object to parse.
 * @this The Controller.
 */
Controller.parseAndDisplayResults = function(obj) {
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
Controller.appendResult = function(result) {
  var title = result['title'];
  var p = document.createElement('li');
  goog.dom.append(p, title);
  var resultsListEl = document.getElementById('results-list');
  goog.dom.append(resultsListEl, p);
};

/**
 * Clear all results from the result list.
 */
Controller.clearResults = function() {
  var resultsListEl = document.getElementById('results-list');
  goog.dom.removeChildren(resultsListEl);
};

/**
 * Simple log function, appends text to the end of a page.
 * @param {string} msg The message to log.
 */
Controller.log = function(msg) {
  document.getElementById('log').appendChild(document.createTextNode(msg));
  document.getElementById('log').appendChild(document.createElement('br'));
};
