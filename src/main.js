import * as THREE from "three";
import * as consts from "./consts";
import Object from "./Object";
import Bola from "./bola";

class World {
  constructor() {}
}

// Inicializar as coisas (1 vez)
const world = {
  scene: null,
  camera: null,
  renderer: null,
  object: new Object("Cubo", 0, 0, 1, 3, 0xe0d055),
  ball: new Bola("Ball", 0, 0, 1, 1, 0xffffff, 0.003, -0.05),
};
init();
// Animar as coisas (RECURSIVA)
animate();

function init() {
  world.scene = new THREE.Scene();
  world.camera = new THREE.OrthographicCamera(
    consts.width / -2,
    consts.width / 2,
    consts.height / 2,
    consts.height / -2,
    0.1,
    1000
  );

  world.camera.position.z = 5;

  document.onkeydown = handle_keys;

  initObjects();

  world.renderer = new THREE.WebGLRenderer();
  world.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(world.renderer.domElement);
}

function initObjects() {
  world.object.add_scene(world.scene);
  world.ball.add_scene(world.scene);
}

function animate() {
  requestAnimationFrame(animate);

  // world.object.cube.rotation.x += 0.01;
  // world.object.cube.rotation.z += 0.07;
  updateObjects();

  world.renderer.render(world.scene, world.camera);
}

function updateObjects() {
  world.object.update();
  world.ball.update();
}

function handle_keys(event) {
  switch (event.key) {
    case "q":
      console.log("Q");
      break;
    case "ArrowUp":
      world.object.move_by(0, 0.1);
      break;

    case "ArrowDown":
      world.object.move_by(0, -0.1);
      break;

    case "ArrowRight":
      world.object.move_by(0.1, 0);
      break;

    case "ArrowLeft":
      world.object.move_by(-0.1, 0);
      break;
  }
}
