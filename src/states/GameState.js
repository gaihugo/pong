import Bola from "../bola";
import Remo, { LADO } from "../remo";

const OBJETOS = {
  BOLA: 0,
  REMO_ESQ: 1,
  REMO_DIR: 2,
};

var MenuState = function () {
  this.name = "Game State"; // Just to identify the State
  this.objetos = [];
  this.update = function () {
    var dt = 10;
    this.objetos.forEach((obj) => {
      obj.update(10, this.objetos);
    });
  };
  this.render = function () {};
  this.onEnter = function () {
    this.createObjs();
    window.onkeydown = (e) => {
      console.log("Clicou", e.key);
      switch (e.key) {
        case "w":
          this.objetos[OBJETOS.REMO_ESQ].move_by(0, 1);
          break;
        case "s":
          this.objetos[OBJETOS.REMO_ESQ].move_by(0, -1);
          break;

        case "ArrowUp":
          this.objetos[OBJETOS.REMO_DIR].move_by(0, 1);
          break;

        case "ArrowDown":
          this.objetos[OBJETOS.REMO_DIR].move_by(0, -1);
          break;

        default:
          break;
      }
    };
  };
  this.onExit = function () {
    window.onkeydown = null;
  };
  this.createObjs = function () {
    this.criarObj(OBJETOS.BOLA, new Bola());
    this.criarObj(OBJETOS.REMO_DIR, new Remo(LADO.DIREITA));
    this.criarObj(OBJETOS.REMO_ESQ, new Remo(LADO.ESQUERDA));
  };

  this.criarObj = function (id, obj) {
    this.objetos[id] = obj;
    this.objetos[id].id = id;
    this.objetos[id].add_scene(window.getScene());
  };
};

export default MenuState;
