goog.provide('model.Question');

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
 */
model.Question = function(id, answerCount, isAnswered, creationDate,
    lastActivityDate, link, author, score, tags, viewCount) {
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
};
goog.inherits(model.Post, model.Question);


/**
 * Build an array of questions based on an array of raw objects.
 * @param {Array.<Object>} rawQuestions The raw question objects.
 * @return {Array.<model.Question>} The constructed questions.
 */
model.Question.buildQuestionsFromRaw = function(rawQuestions) {
  var builtQuestions = [];
  for (var i in rawQuestions) {
    var rawQuestion = rawQuestions[i];
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
    var question = new model.Question(questionId, answerCount, isAnswered,
      creationDate, lastActivityDate, link, author, score, tags, viewCount);
    builtQuestions[builtQuestions.length] = question;
  }
  return builtQuestions;
};
