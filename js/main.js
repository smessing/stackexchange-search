goog.provide('main');

goog.require('control.Controller');

/**
 * The main function---the entry point into the application.
 * @constructor
 */
main.main = function() {
  console.log(control.Controller);
  this.controller = new control.Controller();
};
