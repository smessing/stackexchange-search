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
 * Base URL for executing API requests.
 * @type {string}
 */
control.Controller.BASE_URL = 'https://api.stackexchange.com/2.1/';


/**
 * URL fragment for specifying searches.
 * @type {string}
 */
control.Controller.SEARCH_URL =
  control.Controller.BASE_URL + 'search?order=desc&sort=activity&';


/**
 * End URL specifying StackOverflow website.
 * @type {string}
 */
control.Controller.END_URL = '&site=stackoverflow';


/**
 * Supported search types.
 * @enum {string}
 */
control.Controller.SEARCH_TYPE = {
  IN_TITLE: 'intitle'
};


/**
 * Build a search url.
 * @param {control.Controller.SEARCH_TYPE} type The type of search to perform.
 * @param {string} query The user-supplied query.
 * @return {string} The resulting url to execute a search request.
 */
control.Controller.buildSearchUrl = function(type, query) {
  var queryFragment = type + '=' + query;
  return control.Controller.SEARCH_URL + queryFragment +
    control.Controller.END_URL;
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

  // TODO(sam): make this more flexible.
  var searchType = control.Controller.SEARCH_TYPE.IN_TITLE;
  var searchUrl =
    control.Controller.buildSearchUrl(searchType, this.currentSearchText_);

  var callback = goog.bind(this.handleSearchResults_, this, searchType);
  goog.net.XhrIo.send(searchUrl, callback);
};


/**
 * Callback function for handling search results.
 * @param {control.Controller.SEARCH_TYPE} type The type of search that was
 *   executed.
 * @param {*} e The callback results.
 * @private
 */
control.Controller.prototype.handleSearchResults_ = function(type, e) {
  switch(type) {
    case control.Controller.SEARCH_TYPE.IN_TITLE:
      this.handleInTitleSearch_(e);
  }
};


/**
 * Handles processing the results of an in-title search.
 * @param {*} e The search results.
 * @private
 */
control.Controller.prototype.handleInTitleSearch_ = function(e) {
  var xhr = e.target;
  var obj = xhr.getResponseJson();
  var questions = obj.items;
  console.log(obj);
  this.searchContext_.updateSearchInfo({'text': this.currentSearchText_,
                                        'numResults': questions.length});
};
