goog.provide('control.Routes');


/**
 * The URL for the proxy server.
 * @type {string}
 */
control.Routes.PROXY_SERVER_URL = 'http://127.0.0.1';


/**
 * The port for the proxy server.
 * @type {string}
 */
control.Routes.PROXY_SERVER_PORT = '8888';


/**
 * The proxy server's full address.
 * @type {string}
 */
control.Routes.PROXY_SERVER = control.Routes.PROXY_SERVER_URL + ':' +
    control.Routes.PROXY_SERVER_PORT;

