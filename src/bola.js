import ObjectComFisica from "./FisicObj";
import { TIPO_COLISAO } from "./consts";

export default class Bola extends ObjectComFisica {
  constructor() {
    super("Bola", 0, 0, 1, 1, 0xed2828, 0.23, -0.5);
  }

  update() {
    super.update();
  }

  onCollision(tipo) {
    if (tipo == TIPO_COLISAO.HORIZONTAL) {
      this.vy *= -1;
    }
  }
}
