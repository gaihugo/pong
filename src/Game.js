import { StateStack } from "./StateStack";
import * as THREE from "three";
import * as consts from "./consts";
import MenuState from "./states/MenuState";

var Game = {
  scene: null,
  camera: null,
  renderer: null,
  lastTime: null,

  gameMode: new StateStack(),

  update: function (dt) {
    this.gameMode.update(dt);
    this.gameMode.render(dt);
    this.render(dt);
  },

  render: function () {
    this.renderer.render(this.scene, this.camera);
  },

  startGame: function () {
    this.gameMode.push(new MenuState());
  },

  setupThree: function () {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(
      consts.width / -2,
      consts.width / 2,
      consts.height / 2,
      consts.height / -2,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    // document.onkeydown = handle_keys;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  },

  animate: function (dt) {
    requestAnimationFrame((now) => {
      if (!this.lastTime) {
        this.lastTime = now;
      }

      this.animate(this.lastTime - now);

      this.lastTime = now;
    });
    this.update(dt);
  },

  init: function () {
    this.setupThree();
    this.startGame();
    this.animate(0.01);
  },
};

export default Game;
