goog.provide('controller');
goog.require('goog.net.XhrIo');


/**
 * Entry point into the program.
 */
function main() {
  alert('it works!');
}

/**
 * Retrieve JSON data using XhrIo's static send() method.
 *
 * @param {string} dataUrl The url to request.
 */
function getData(dataUrl) {
  log('Sending simple request for [' + dataUrl + ']');
  goog.net.XhrIo.send(dataUrl, function(e) {
    var xhr = e.target;
    var obj = xhr.getResponseJson();
    log('Received Json data object with title property of "' +
        obj['title'] + '"');
    alert(obj['content']);
  });
}
