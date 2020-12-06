import ObjectComFisica from "./FisicObj";

export default class Bola extends ObjectComFisica {
  update() {
    super.update();
  }

  onCollision(tipo) {
    if (tipo == tipo) {
      this.vy *= -1;
    }
  }
}
