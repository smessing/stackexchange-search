goog.provide('model.Post');

/**
 * A StackOverflow Post.
 * @constructor
 * @param {number} id This post's id.
 * @param {number} creationDate The creation date for this post.
 * @param {number} lastActivityDate The date of last activity.
 * @param {string} author The author of this post.
 * @param {number} score The score of this post.
 * @param {string|goog.uri} link The uri of this post.
 */
model.Post = function(id, creationDate, lastActivityDate, author, score, link) {
  /**
   * @type {number}
   * @private
   */
  this.id_ = id;
  /**
   * @type {number}
   * @private
   */
  this.creationDate_ = creationDate;
  /**
   * @type {number}
   * @private
   */
  this.lastActivityDate_ = lastActivityDate;
  /**
   * @type {string}
   * @private
   */
  this.author_ = author;
  /**
   * @type {number}
   * @private
   */
  this.score_ = score;
  /**
   * @type {string}
   * @private
   */
  this.link_ = link;
};
