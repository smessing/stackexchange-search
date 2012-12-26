goog.provide('controller');
goog.require('goog.net.XhrIo');


/**
 * Entry point into the program.
 */
function main() {
}

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
 */
controller.getData = function(dataUrl) {
  controller.log('Sending simple request for [' + dataUrl + ']');
  goog.net.XhrIo.send(dataUrl, function(e) {
    var xhr = e.target;
    var obj = xhr.getResponseJson();
    controller.log('Received Json data object with title property of "' +
        obj['title'] + '"');
  });
};

/**
 * Simple log function, appends text to the end of a page.
 * @param {string} msg The message to log.
 */
controller.log = function(msg) {
  document.getElementById('log').appendChild(document.createTextNode(msg));
  document.getElementById('log').appendChild(document.createElement('br'));
};
