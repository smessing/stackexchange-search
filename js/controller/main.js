goog.provide('controller');
goog.require('goog.net.XhrIo');


/**
 * Entry point into the program.
 */
function main() {
}

controller.BASE_URL = 'https://api.stackexchange.com/2.1/';
controller.SEARCH_URL =
  controller.BASE_URL + 'search?order=desc&sort=activity&intitle=';
controller.URL_END = '&site=stackoverflow';

controller.search = function() {
  var searchBar = document.getElementById('search-bar');
  url = controller.buildUrl(searchBar.value);
  data = controller.getData(url);
}

controller.buildUrl = function(searchText) {
  return controller.SEARCH_URL + searchText + controller.URL_END;
}

/**
 * Retrieve JSON data using XhrIo's static send() method.
 *
 * @param {string} dataUrl The url to request.
 */
controller.getData = function(dataUrl) {
  log('Sending simple request for [' + dataUrl + ']');
  goog.net.XhrIo.send(dataUrl, function(e) {
    var xhr = e.target;
    var obj = xhr.getResponseJson();
    controller.log('Received Json data object with title property of "' +
        obj['title'] + '"');
  });
}

controller.log = function(msg) {
  document.getElementById('log').appendChild(document.createTextNode(msg));
  document.getElementById('log').appendChild(document.createElement('br'));
}
