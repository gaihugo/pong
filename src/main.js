import * as THREE from "three";
const ASPECT_CORRECT = 80;
const height = window.innerHeight / ASPECT_CORRECT;
const width = window.innerWidth / ASPECT_CORRECT;

const TIPO_COLISAO = {
  HORIZONTAL: "hor",
  VERTICAL: "ver",
  BOLA: "bola",
  BARRA: "barra",
};

function Object(name, x, y, w, h, color) {
  const geometry = new THREE.BoxGeometry(w, h, 1);
  const material = new THREE.MeshBasicMaterial({ color: color });
  var cube = new THREE.Mesh(geometry, material);
  cube.position.x = x;
  cube.position.y = y;
  return {
    name,
    cube,
    move_by(dx, dy) {
      if (
        cube.position.x + dx + w / 2 > width / 2 ||
        cube.position.x + dx - w / 2 < width / -2
      ) {
        this.onCollision(TIPO_COLISAO.VERTICAL);
        return;
      }
      if (
        cube.position.y + dy + h / 2 > height / 2 ||
        cube.position.y + dy - h / 2 < height / -2
      ) {
        this.onCollision(TIPO_COLISAO.HORIZONTAL);
        return;
      }

      cube.position.x += dx;
      cube.position.y += dy;
    },
    add_scene(scene) {
      scene.add(cube);
    },
    update() {},
    onCollision(tipo_colisao) {
      console.log("Colidiu com a", tipo_colisao);
    },
  };
}

function Bola() {}

const world = {
  scene: null,
  camera: null,
  renderer: null,
  object: Object("Cubo", 0, 0, 1, 3, 0xe0d055),
};

// Inicializar as coisas (1 vez)
init();
// Animar as coisas (RECURSIVA)
animate();

function init() {
  world.scene = new THREE.Scene();
  world.camera = new THREE.OrthographicCamera(
    width / -2,
    width / 2,
    height / 2,
    height / -2,
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
