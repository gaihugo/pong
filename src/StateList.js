export var StateList = function () {
  var states = [];

  this.pop = function () {
    return states.pop();
  };
  this.push = function (state) {
    states.push(state);
  };
  this.top = function () {
    return states[states.length - 1];
  };
};
