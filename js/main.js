goog.provide('main');

goog.require('control.Controller');

main.main = function() {
  console.log(control.Controller);
  this.controller = new control.Controller();
}
