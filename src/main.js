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

class Object {
  constructor(name, x, y, w, h, color) {
    const geometry = new THREE.BoxGeometry(w, h, 1);
    const material = new THREE.MeshBasicMaterial({ color: color });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.x = x;
    this.cube.position.y = y;
    this.name = name;
    this.w = w;
    this.h = h;
  }

  move_by(dx, dy) {
    if (
      this.cube.position.x + dx + this.w / 2 > width / 2 ||
      this.cube.position.x + dx - this.w / 2 < width / -2
    ) {
      this.onCollision(TIPO_COLISAO.VERTICAL);
      return;
    }
    if (
      this.cube.position.y + dy + this.h / 2 > height / 2 ||
      this.cube.position.y + dy - this.h / 2 < height / -2
    ) {
      this.onCollision(TIPO_COLISAO.HORIZONTAL);
      return;
    }

    this.cube.position.x += dx;
    this.cube.position.y += dy;
  }
  add_scene(scene) {
    scene.add(this.cube);
  }
  update() {}
  onCollision(tipo_colisao) {
    console.log(this.name, "Colidiu com a", tipo_colisao);
  }
}

class ObjectComFisica extends Object {
  constructor(name, x, y, w, h, color, vx0, vy0) {
    super(name, x, y, w, h, color);
    this.vx = vx0;
    this.vy = vy0;
  }

  update() {
    super.update();
    this.move_by(this.vx, this.vy);
  }
}

class Bola extends ObjectComFisica {
  update() {
    super.update();
  }

  onCollision(tipo_colisao) {
    if (tipo_colisao == TIPO_COLISAO.HORIZONTAL) {
      this.vy *= -1;
    }
  }
}

const world = {
  scene: null,
  camera: null,
  renderer: null,
  object: new Object("Cubo", 0, 0, 1, 3, 0xe0d055),
  ball: new Bola("Ball", 0, 0, 1, 1, 0xffffff, 0.003, -0.05),
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
