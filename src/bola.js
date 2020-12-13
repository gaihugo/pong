import ObjectComFisica from "./FisicObj";
import { TIPO_COLISAO } from "./consts";

export default class Bola extends ObjectComFisica {
  constructor() {
    super("Bola", 0, 0, 1, 1, 0xed2828, 0.23, -0.2);
  }

  update(dt, objetos) {
    super.update(dt, objetos);
  }

  onCollision(tipo) {
    if (tipo == TIPO_COLISAO.HORIZONTAL) {
      this.vy *= -1;
    }
    // console.log("COLISSÂO ", tipo);
    if (tipo == TIPO_COLISAO.BARRA) {
      // this.material.color = 0x28ed28;
      this.vx *= -1;
    }
  }
}
