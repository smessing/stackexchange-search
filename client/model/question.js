goog.provide('model.Question');

goog.require('goog.net.XhrIo');
goog.require('model.Post');

/**
 * A StackOverflow Question.
 * @constructor
 * @extends {model.Post}
 * @param {number} id This post's id.
 * @param {number} answerCount The number of answers for this question.
 * @param {boolean} isAnswered Whether this question has been answered.
 * @param {number} creationDate The creation date for this post.
 * @param {number} lastActivityDate The date of last activity.
 * @param {string|goog.uri} link The uri of this post.
 * @param {string} author The author of this post.
 * @param {number} score The score of this post.
 * @param {Array.<string>} tags The tags for this post.
 * @param {number} viewCount The view count for this question.
 * @param {string} title The title of this question.
 */
model.Question = function(id, answerCount, isAnswered, creationDate,
    lastActivityDate, link, author, score, tags, viewCount, title) {
  model.Post.call(
    this, id, creationDate, lastActivityDate, author, score, link);
  /**
   * @type {number}
   * @private
   */
  this.answerCount_ = answerCount;
  /**
   * @type {boolean}
   * @private
   */
  this.isAnswered_ = isAnswered;
  /**
   * @type {Array.<string>}
   * @private
   */
  this.tags_ = tags;
  /**
   * @type {number}
   * @private
   */
  this.viewCount_ = viewCount;
  /**
   * @type {string}
   * @private
   */
  this.title_ = title;

  this.getQuestionHtml();
};
goog.inherits(model.Post, model.Question);


/**
 * Execute an XHR and grab the HTML for the question's text.
 */
model.Question.prototype.getQuestionHtml = function() {
  var callback = goog.bind(this.handleQuestionHtml_, this);
  goog.net.XhrIo.send(this.link, callback);
};


/**
 * Handle grabbing the HTML for the question's text from the question's
 * webpage.
 * @param {*} e The callback results.
 * @private
 */
model.Question.prototype.handleQuestionHtml_ = function(e) {
  var xhr = e.target;
  console.log(xhr);
};


/**
 * Build an array of questions based on an array of raw objects.
 * @param {Array.<Object>} rawQuestions The raw question objects.
 * @return {Array.<model.Question>} The constructed questions.
 */
model.Question.buildQuestionsFromRaw = function(rawQuestions) {
  var builtQuestions = [];
  for (var i in rawQuestions) {
    var rawQuestion = rawQuestions[i];
    builtQuestions[builtQuestions.length] =
      model.Question.buildQuestionFromRaw(rawQuestion);
  }
  return builtQuestions;
};


/**
 * Build one question based on a raw object.
 * @param {Object} rawQuestion The raw question object.
 * @return {model.Question} The constructed question.
 */
model.Question.buildQuestionFromRaw = function(rawQuestion) {
  var questionId = rawQuestion['question_id'];
  var answerCount = rawQuestion['answer_count'];
  var isAnswered = rawQuestion['is_answered'];
  var creationDate = rawQuestion['creation_date'];
  var lastActivityDate = rawQuestion['last_activity_date'];
  var link = rawQuestion['link'];
  // TODO(sam): for metrics, building an author object might be useful...
  var author = rawQuestion['owner']['display_name'];
  var score = rawQuestion['score'];
  var tags = rawQuestion['tags'];
  var viewCount = rawQuestion['view_count'];
  var title = rawQuestion['title'];
  var question = new model.Question(questionId, answerCount, isAnswered,
    creationDate, lastActivityDate, link, author, score, tags, viewCount,
    title);
  return question;
};


/**
 * Get this questions' title.
 * @return {string} The title of this question.
 */
model.Question.prototype.getTitle = function() {
  return this.title_;
};
