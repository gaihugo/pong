import ObjectComFisica from "./FisicObj";
import { TIPO_COLISAO } from "./consts";
import { LADO } from "./remo";

export default class Bola extends ObjectComFisica {
  constructor(giveVictory) {
    super("Bola", 0, 0, 1.5, 1.5, 0xed2828, 0.0152, -0.018);
    this.giveVictory = giveVictory;
  }

  update(dt, objetos) {
    super.update(dt, objetos);
  }

  onCollision(tipo) {
    if (tipo == TIPO_COLISAO.HORIZONTAL) {
      this.vy *= -1;
    }
    if (tipo == TIPO_COLISAO.BARRA) {
      this.vx *= -1;
    }

    if (tipo == TIPO_COLISAO.VERTICAL) {
      // Identificar o lado que venceu
      if (this.cube.position.x > 0) {
        // X é positivo -> bola direita -> vitoria da esquerda
        this.giveVictory(LADO.ESQUERDA);
      } else {
        // X é negativo -> bola esquerda -> vitoria da direita
        this.giveVictory(LADO.DIREITA);
      }
    }
  }

  restart() {
    this.cube.position.x = 0;
    this.cube.position.y = 0;
    this.vx *= -1;

    // TODO Parar a bola por um periodo de tempo
  }
}
