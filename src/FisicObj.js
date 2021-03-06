import Object from "./Object";

export default class ObjectComFisica extends Object {
  constructor(name, x, y, w, h, color, vx0, vy0) {
    super(name, x, y, w, h, color);
    this.vx = vx0;
    this.vy = vy0;
  }

  update(dt, objetos) {
    super.update(dt, objetos);
    this.move_by(this.vx * dt, this.vy * dt);
  }
}
