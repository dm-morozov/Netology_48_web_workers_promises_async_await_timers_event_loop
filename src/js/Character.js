// Character.js
import Validator from "./Validator.js";

export default class Character {
  constructor(name, type) {
    const validator = new Validator(name);
    validator.validateUsername(); // Бросит ошибку, если имя некорректно

    const types = [
      "Bowman",
      "Swordsman",
      "Magician",
      "Daemon",
      "Undead",
      "Zombie",
    ];

    if (!types.includes(type)) {
      throw new Error(`Тип должен быть одним из: ${types.join(", ")}`);
    }

    this.name = name;
    this.type = type;
    Object.defineProperty(this, "type", {
      value: type,
      writable: false,
      configurable: false,
      enumerable: true,
    });
    this.health = 100;
    this.level = 1;
    this.attack = undefined;
    this.defence = undefined;
    this.special = [];
    // так как мы будем менять this.attack
    // нам где-то нужно хранить базовую атаку.
    // А там будут геттеры и сеттеры
    this._baseAttack = undefined;
  }

  // теперь чтобы все работало корректно из-за _baseAttack и
  // attack мы будем сдесь использовать,
  // а в MagicalCharacter переопределять
  // в таком случае мы в LevelUp()
  // сможем оставить levelUp() this._baseAttack *= 1.2;

  set attack(value) {
    this._baseAttack = value;
  }

  get attack() {
    return this._baseAttack;
  }

  // Получается наиболее чистое решение т.к.
  // attack теперь у всех связан с _baseAttack

  levelUp() {
    if (this.health <= 0) {
      throw new Error("Нельзя повысить левел умершего");
    }
    if (this.attack === undefined || this.defence === undefined) {
      throw new Error("Нельзя повысить уровень: attack или defence не заданы");
    }
    this.level += 1;
    this._baseAttack *= 1.2; // Изменяем базовую атаку (поменяли attack на _baseAttack)
    this.defence *= 1.2;
    this.health = 100;
  }

  damage(points) {
    if (this.defence === undefined) {
      throw new Error("Нельзя нанести урон: defence не задано");
    }
    this.health = Math.max(0, this.health - points * (1 - this.defence / 100));
  }

  orderByProps(order) {
    const result = [];
    const resultOtherProps = [];

    // console.log(order);
    // console.log(Object.entries(obj));
    for (const key of order) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        result.push({ key, value: this[key] });
      }
    }
    for (const key in this) {
      if (
        Object.prototype.hasOwnProperty.call(this, key) &&
        !order.includes(key)
      ) {
        resultOtherProps.push({ key, value: this[key] });
      }
    }
    resultOtherProps.sort((a, b) => a.key.localeCompare(b.key));
    return [...result, ...resultOtherProps];
  }

  getSpecialAttack() {
    return (this.special || []).map(
      ({ id, name, icon, description = "Описание недоступно" }) => ({
        id,
        name,
        icon,
        description,
      }),
    );
  }
}
