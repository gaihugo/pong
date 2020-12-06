import * as THREE from "three";
import * as consts from "./consts";

export default class Object {
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
      this.cube.position.x + dx + this.w / 2 > consts.width / 2 ||
      this.cube.position.x + dx - this.w / 2 < consts.width / -2
    ) {
      this.onCollision(consts.TIPO_COLISAO.VERTICAL);
      return;
    }
    if (
      this.cube.position.y + dy + this.h / 2 > consts.height / 2 ||
      this.cube.position.y + dy - this.h / 2 < consts.height / -2
    ) {
      this.onCollision(consts.TIPO_COLISAO.HORIZONTAL);
      return;
    }

    this.cube.position.x += dx;
    this.cube.position.y += dy;
  }
  add_scene(scene) {
    scene.add(this.cube);
  }
  update() {}
  onCollision(tipo) {
    console.log(this.name, "Colidiu com a", tipo);
  }
}
