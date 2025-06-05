// Daemon.js
import MagicalCharacter from "./MagicalCharacter.js";

export default class Daemon extends MagicalCharacter {
  constructor(name) {
    super(name, "Daemon");
    this.attack = 10;
    this.defence = 40;
  }
}
