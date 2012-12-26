goog.provide('control.Controller');

goog.require('goog.net.XhrIo');

/**
 * The application controller.
 * @constructor
 */
control.Controller = function() {
  /**
   * Array of results for the current search.
   * @type {Array.<model.Result=>}
   * @private
   */
  this.results_ = [];

};


/**
 * The text used for the currently displayed search results.
 * @type {string}
 * @private
 */
control.Controller.prototype.currentSearchText_ = '';
