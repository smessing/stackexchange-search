/**
 * TODO(sam): JSDoc
 */
goog.provide('view.context.ResultsContext');

goog.require('goog.dom.DomHelper');
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

  // TODO(sam): figure out what to do for empty resultsContext...
  this.resultsEl_.innerHTML = view.context.templates.resultsContext({});
};
goog.inherits(view.context.ResultsContext, view.context.Context);
