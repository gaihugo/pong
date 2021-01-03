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
  this.scoreEsq = 0;
  this.scoreDir = 0;

  this.update = function (dt) {
    this.objetos.forEach((obj) => {
      obj.update(dt, this.objetos);
    });
  };
  this.render = function () {};
  this.onEnter = function () {
    this.createObjs();
    window.onkeydown = (e) => {
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

  this.giveVictory = (winner) => {
    if (LADO.DIREITA === winner) {
      this.scoreDir++;
    } else {
      this.scoreEsq++;
    }

    this.objetos[OBJETOS.BOLA].restart();

    // TODO Conferir se algum lado venceu (chegou a 25 pts.)
  };

  this.createObjs = function () {
    this.criarObj(OBJETOS.BOLA, new Bola(this.giveVictory));
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
