import * as THREE from "three";

const world = {
  scene: null,
  camera: null,
  renderer: null,
  object: {
    geometry: null,
    material: null,
    cube: null,
  },
};

// Inicializar as coisas (1 vez)
init();
// Animar as coisas (RECURSIVA)
animate();

function init() {
  world.scene = new THREE.Scene();
  world.camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  world.object.geometry = new THREE.BoxGeometry();
  world.object.material = new THREE.MeshBasicMaterial({ color: 0xe0d055 });
  world.object.cube = new THREE.Mesh(
    world.object.geometry,
    world.object.material
  );

  world.scene.add(world.object.cube);

  world.camera.position.z = 5;

  world.renderer = new THREE.WebGLRenderer();
  world.renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(world.renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);

  world.object.cube.rotation.x += 0.01;
  world.object.cube.rotation.z += 0.07;

  world.renderer.render(world.scene, world.camera);
}
