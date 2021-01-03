import Object from "./Object";
import { width, height } from "./consts";

const ALTURA = 7;
const LARGURA = 3;

export const LADO = {
  ESQUERDA: -1,
  DIREITA: 1,
};

export default class Remo extends Object {
  constructor(lado) {
    super(
      "Remo " + lado,
      (width / 2) * lado + 4 * -lado,
      0,
      LARGURA,
      ALTURA,
      0xffffff
    );

    this.lado = lado;
  }
}
