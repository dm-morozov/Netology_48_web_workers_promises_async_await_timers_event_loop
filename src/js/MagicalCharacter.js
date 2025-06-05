// MagicalCharacter.js

import Character from "./Character.js";

// По началу все реализовал в Character.js
// Но тогда наши изменения затрагивало всех персонажей
// было решено набисать промежуточный класс

export default class MagicalCharacter extends Character {
  constructor(name, type) {
    super(name, type);
    this._stoned = false;
    this._distance = 1;
  }

  get stoned() {
    return this._stoned;
  }

  set stoned(value) {
    this._stoned = !!value; // получаем булево значение
  }

  get distance() {
    return this._distance;
  }

  set distance(value) {
    if (value < 1 || value > 5) {
      throw new Error("Расстояние должно быть от 1 до 5 клеток");
    }
    this._distance = value;
  }

  // Нам нужно переопределить атаки с учетом задания

  set attack(value) {
    this._baseAttack = value;
  }

  get attack() {
    if (this._baseAttack === undefined) {
      return undefined;
    }

    // на всякий случай добавим проверку на растояние
    // если оно некорректное, то атака будет 0
    if (this._distance < 1 || this._distance > 5) {
      return 0;
    }

    // Шаг 1: Уменьшение атаки по расстоянию
    const distanceVariation = 1 - (this._distance - 1) * 0.1;
    let attack = this._baseAttack * distanceVariation;

    // Шаг 2: Уменьшение от дурмана
    if (this._stoned) {
      attack -= Math.log2(this._distance) * 5;
    }

    // Атака не может быть меньше 0
    return Math.max(0, Math.round(attack));
  }
}
