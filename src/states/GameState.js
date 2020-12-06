import Bola from "../bola";

var MenuState = function () {
  this.name = "Game State"; // Just to identify the State
  this.update = function () {
    this.ball.update();
  };
  this.render = function () {};
  this.onEnter = function () {
    window.onkeydown = function (e) {};
    this.ball = new Bola("Ball", 0, 0, 1, 1, 0xffffff, 0.003, -0.05);
    this.ball.add_scene(window.getScene());
  };
  this.onExit = function () {
    window.onkeydown = null;
  };
};

export default MenuState;
