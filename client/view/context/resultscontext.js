/**
 * TODO(sam): JSDoc
 */
goog.provide('view.context.ResultsContext');

goog.require('goog.dom.DomHelper');
goog.require('soy');
goog.require('view.context.Context');
goog.require('view.context.templates');


/**
 * The results view context.
 * @param {Element} appEl The application element.
 * @constructor
 * @extends {view.context.Context}
 */
view.context.ResultsContext = function(appEl) {
  /**
   * Dom helper for this search context.
   * @type {goog.dom.DomHelper}
   * @private
   */
  this.domHelper_ = new goog.dom.DomHelper();

  /**
   * Reference to the containing results div.
   * @type {!Element}
   * @private
   */
  this.resultsEl_ = this.domHelper_.createDom('div', {'class': 'context',
                                                     'id': 'results-context'});
  goog.dom.appendChild(appEl, this.resultsEl_);
};
goog.inherits(view.context.ResultsContext, view.context.Context);


/**
 * Update the results context with new results.
 * @param {Array.<model.Post>} results The new results.
 */
view.context.ResultsContext.prototype.updateNewResults = function(results) {
  // Flush the old results list.
  goog.dom.removeChildren(this.resultsEl_);

  var paramsObj = {'results': results};
  this.resultsEl_.innerHTML = view.context.templates.resultsContext(paramsObj);
};


/**
 * Update the results context with one new result.
 * @param {model.Post} result The new result.
 */
view.context.ResultsContext.prototype.updateNewResult = function(result) {
  if (goog.dom.getChildren(this.resultsEl_).length == 0) {
    var paramsObj = {'results': [result]};
    this.resultsEl_.innerHTML =
        view.context.templates.resultsContext(paramsObj);
  } else {
    var paramsObj = {'result': result, 'isFirst': false};
    var newResult =
        soy.renderAsFragment(view.context.templates.resultsContextListItem,
        paramsObj);
    var resultsListEl = goog.dom.getElement('results-list');
    goog.dom.appendChild(resultsListEl, newResult);
  }
};


/**
 * Clear the results context of old results.
 */
view.context.ResultsContext.prototype.clearOldResults = function() {
    goog.dom.removeChildren(this.resultsEl_);
};
