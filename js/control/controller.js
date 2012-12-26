goog.provide('control.Controller');

goog.require('goog.net.XhrIo');
goog.require('view.context.SearchContext');

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

  /**
   * The search-context view.
   * @type {view.context.SearchContext}
   * @private
   */
  this.searchContext_ = new view.context.SearchContext();
};


/**
 * The text used for the currently displayed search results.
 * @type {string}
 * @private
 */
control.Controller.prototype.currentSearchText_ = '';
