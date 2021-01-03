import * as THREE from "three";
import * as consts from "./consts";

export default class Object {
  constructor(name, x, y, w, h, color) {
    const geometry = new THREE.BoxGeometry(w, h, 1);
    this.material = new THREE.MeshBasicMaterial({ color: color });
    this.cube = new THREE.Mesh(geometry, this.material);
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
  update(dt, objetos) {
    // console.log(dt);
    objetos.forEach((obj) => {
      if (obj.id != this.id) {
        var rect1 = {
          x: this.cube.position.x - this.w / 2,
          y: this.cube.position.y - this.h / 2,
          width: this.w,
          height: this.h,
        };
        var rect2 = {
          x: obj.cube.position.x - obj.w / 2,
          y: obj.cube.position.y - obj.h / 2,
          width: obj.w,
          height: obj.h,
        };

        if (
          rect1.x < rect2.x + rect2.width &&
          rect1.x + rect1.width > rect2.x &&
          rect1.y < rect2.y + rect2.height &&
          rect1.y + rect1.height > rect2.y
        ) {
          if (obj.id == 0) {
            this.onCollision(consts.TIPO_COLISAO.BOLA);
          } else {
            this.onCollision(consts.TIPO_COLISAO.BARRA);
          }
        }
      }
    });
  }
  onCollision(tipo) {}
}
