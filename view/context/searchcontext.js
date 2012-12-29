/**
 * TODO(sam): JSDoc
 */
goog.provide('view.context.SearchContext');

goog.require('goog.dom.DomHelper');
goog.require('view.context.Context');
goog.require('view.context.templates');


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
  this.searchEl_ = this.domHelper_.createDom('div', {'class': 'context',
                                                     'id': 'search-context'});
  goog.dom.appendChild(appEl, this.searchEl_);

  this.searchEl_.innerHTML = view.context.templates.searchContext();

  /**
   * Reference to the search bar.
   * @type {!Element}
   * @private
   */
  this.searchBar_ = this.domHelper_.getElement('search-bar');

  /**
   * Reference to the search info box.
   * @type {!Element}
   * @private
   */
  this.searchInfo_ = this.domHelper_.getElement('search-info');
};
goog.inherits(view.context.SearchContext, view.context.Context);


/**
 * Return a reference to the search bar element.
 * @return {!Element} The search bar element.
 */
view.context.SearchContext.prototype.getSearchBar = function() {
  return this.searchBar_;
};


/**
 * Return a reference to the search info element.
 * @return {!Element} The search info element.
 */
view.context.SearchContext.prototype.getSearchInfo = function() {
  return this.searchInfo_;
};


/**
 * Update the search info based on the last search executed.
 * @param {!Object} infoObj The search info object.
 */
view.context.SearchContext.prototype.updateSearchInfo = function(infoObj) {
  // Flush the search info.
  goog.dom.removeChildren(this.searchInfo_);

  var searchInfoList =
      this.domHelper_.createDom('ul', {'id': 'search-info-list'});
  goog.dom.appendChild(this.searchInfo_, searchInfoList);

  var searchTextEl =
    this.domHelper_.createDom('li', {'id': 'search-info-text'});
  goog.dom.appendChild(searchInfoList, searchTextEl);

  var text = 'query: ' + infoObj['text'];
  var searchText = this.domHelper_.createTextNode(text);
  goog.dom.appendChild(searchTextEl, searchText);

  var numTextEl =
    this.domHelper_.createDom('li', {'id': 'search-info-num-results'});
  goog.dom.appendChild(searchInfoList, numTextEl);

  var numResults = 'number of results: ' + infoObj['numResults'];
  var numText = this.domHelper_.createTextNode(numResults);
  goog.dom.appendChild(numTextEl, numText);
};
