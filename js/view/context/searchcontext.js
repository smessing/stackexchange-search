/**
 * TODO(sam): JSDoc
 */
goog.provide('view.context.SearchContext');

goog.require('goog.dom.DomHelper');
goog.require('view.context.Context');


/**
 * The search view context.
 * @param {Element} appEl The application element.
 * @constructor
 * @extends {view.context.Context}
 */
view.context.SearchContext = function(appEl) {

  /**
   * Dom helper for this search context.
   * @type {goog.dom.DomHelper}
   * @private
   */
  this.domHelper_ = new goog.dom.DomHelper();

  /**
   * Reference to the containing search div.
   * @type {!Element}
   * @private
   */
  this.searchEl_ = this.domHelper_.createDom('div', {'class': 'search'});
  goog.dom.appendChild(appEl, this.searchEl_);

  /**
   * Reference to the search bar.
   * @type {!Element}
   * @private
   */
  this.searchBar_ = this.domHelper_.createDom('input', {'id': 'search-bar'});
  goog.dom.appendChild(this.searchEl_, this.searchBar_);
};
goog.inherits(view.context.SearchContext, view.context.Context);


/**
 * Return a reference to the search bar element.
 * @return {!Element} The search bar element.
 */
view.context.SearchContext.prototype.getSearchBar = function() {
  return this.searchBar_;
};

