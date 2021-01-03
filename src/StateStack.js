import { StateList } from "./StateList";
import { EmptyState } from "./states/EmptyState";

export var StateStack = function () {
  var states = new StateList();
  states.push(new EmptyState());

  this.update = function (dt) {
    var state = states.top();
    if (state) {
      state.update(dt);
    }
  };

  this.render = function () {
    var state = states.top();
    if (state) {
      state.render();
    }
  };

  this.push = function (state) {
    this.pause();
    states.push(state);
    state.onEnter();
  };
  this.pop = function () {
    var state = states.top();
    state.onExit();
    states.pop();
    this.resume();
  };

  this.pause = function () {
    var state = states.top();
    if (state.onPause) {
      state.onPause();
    }
  };

  this.resume = function () {
    var state = states.top();
    if (state.onResume) {
      state.onResume();
    }
  };
};
