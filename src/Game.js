import { StateStack } from "./StateStack";
import * as THREE from "three";
import * as consts from "./consts";
import MenuState from "./states/MenuState";

var Game = {
  scene: null,
  camera: null,
  renderer: null,

  gameMode: new StateStack(),

  update: function () {
    this.gameMode.update();
    this.gameMode.render();
    this.render();
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

  animate: function () {
    requestAnimationFrame(() => this.animate());
    this.update();
  },

  init: function () {
    this.setupThree();
    this.startGame();
    this.animate();
  },
};

export default Game;
