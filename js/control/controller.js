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

  var appEl = goog.dom.getElement('app');
  /**
   * The search-context view.
   * @type {view.context.SearchContext}
   * @private
   */
  this.searchContext_ = new view.context.SearchContext(appEl);

  var searchBar = this.searchContext_.getSearchBar();
  var handler = goog.bind(this.handleSearch, this);
  goog.events.listen(searchBar, goog.events.EventType.KEYUP, handler);
};


/**
 * The text used for the currently displayed search results.
 * @type {string}
 * @private
 */
control.Controller.prototype.currentSearchText_ = '';


/**
 * Event handler for when user types into the search bar.
 * @param {goog.events.Event} e The event.
 */
control.Controller.prototype.handleSearch = function(e) {
  // TODO(sam): infoObj should probably have a class of its own...
  var searchBar = e.target;
  var searchText = searchBar.value;

  // Protect against redundant searching.
  if (searchText == this.currentSearchText_) {
    return;
  }
  this.currentSearchText_ = searchText;

  this.searchContext_.updateSearchInfo({'text': this.currentSearchText_});
};
