import Bola from "../bola";
import Remo, { LADO } from "../remo";

const OBJETOS = {
  BOLA: 0,
  REMO_ESQ: 1,
  REMO_DIR: 2,
};

function updateScore(esq, dir) {
  document.getElementById("score-esq").textContent = esq;
  document.getElementById("score-dir").textContent = dir;
}

var MenuState = function () {
  this.name = "Game State"; // Just to identify the State
  this.objetos = [];
  this.scoreEsq = 0;
  this.scoreDir = 0;

  this.paused = false;
  this.finished = false;

  this.update = function (dt) {
    if (this.paused) return;

    this.objetos.forEach((obj) => {
      obj.update(dt, this.objetos);
    });
  };
  this.render = function () {};
  this.onEnter = function () {
    this.createObjs();
    document.getElementById("placar").hidden = false;

    this.music = new Audio("audio/GAME.mp3");
    this.victoryMusic = new Audio("audio/VICTORY.mp3");
    this.victoryMusic.volume = 0.5;
    this.music.play();
    this.music.loop = true;
    this.music.volume = 0.2;

    window.onkeydown = (e) => {
      switch (e.key) {
        case "w":
          if (!this.paused) this.objetos[OBJETOS.REMO_ESQ].move_by(0, 1);
          break;

        case "s":
          if (!this.paused) this.objetos[OBJETOS.REMO_ESQ].move_by(0, -1);
          break;

        case "W":
          if (!this.paused) this.objetos[OBJETOS.REMO_ESQ].move_by(0, 1);
          break;

        case "S":
          if (!this.paused) this.objetos[OBJETOS.REMO_ESQ].move_by(0, -1);
          break;

        case "ArrowUp":
          if (!this.paused) this.objetos[OBJETOS.REMO_DIR].move_by(0, 1);
          break;

        case "ArrowDown":
          if (!this.paused) this.objetos[OBJETOS.REMO_DIR].move_by(0, -1);
          break;

        case "Escape":
          this.paused = !this.paused;
          if (this.finished) {
            window.getGameInstance().pop();
          }
          break;

        default:
          break;
      }
    };
  };
  this.onExit = function () {
    window.onkeydown = null;
    document.getElementById("placar").hidden = true;
    document.getElementById("message").hidden = true;

    this.objetos.forEach((obj) => {
      window.getScene().remove(obj.cube);
    });

    updateScore(0, 0);
  };

  this.giveVictory = (winner) => {
    if (LADO.DIREITA === winner) {
      this.scoreDir++;
    } else {
      this.scoreEsq++;
    }
    updateScore(this.scoreEsq, this.scoreDir);

    this.objetos[OBJETOS.BOLA].restart();

    // Conferir se algum lado venceu (chegou a 25 pts.)
    if (this.scoreDir >= 15) {
      this.paused = true;
      this.finished = true;
      document.getElementById("message").textContent = "Right Wins!!";
      document.getElementById("message").hidden = false;
      this.music.pause();
      this.victoryMusic.play();

      window.getScene().remove(this.objetos[OBJETOS.BOLA].cube);
    }
    if (this.scoreEsq >= 15) {
      this.paused = true;
      this.finished = true;
      document.getElementById("message").textContent = "Left Wins!!";
      document.getElementById("message").hidden = false;
      this.music.pause();
      this.victoryMusic.play();
      window.getScene().remove(this.objetos[OBJETOS.BOLA].cube);
    }
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
