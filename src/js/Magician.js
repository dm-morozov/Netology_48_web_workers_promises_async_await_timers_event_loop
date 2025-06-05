// Magician.js
import MagicalCharacter from "./MagicalCharacter.js";

export default class Magician extends MagicalCharacter {
  constructor(name) {
    super(name, "Magician");
    this.attack = 10;
    this.defence = 40;
  }
}
