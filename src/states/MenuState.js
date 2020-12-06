import GameState from "./GameState";

var MenuState = function () {
  this.name = "Menu State"; // Just to identify the State
  this.update = function () {};
  this.render = function () {};
  this.onEnter = function () {
    document.getElementById("menu").hidden = false;
    window.onkeydown = function (e) {
      if (e.key == "Enter") {
        window.getGameInstance().push(new GameState());
      }
      //console.log("Pressed: ", e.key);
    };
  };
  this.onExit = function () {
    document.getElementById("menu").hidden = true;
    window.onkeydown = null;
  };

  this.onPause = function () {
    document.getElementById("menu").hidden = true;
    window.onkeydown = null;
  };
};

export default MenuState;
