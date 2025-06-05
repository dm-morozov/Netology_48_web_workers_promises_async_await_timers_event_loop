// Character.test.js
import Bowman from "../Bowman.js";
import Character from "../Character.js";
import Daemon from "../Daemon.js";
import Magician from "../Magician.js";
import Swordsman from "../Swordsman.js";
import Undead from "../Undead.js";
import Zombie from "../Zombie.js";

describe("Character", () => {
  test("Создание персонажа character", () => {
    const character = new Bowman("Archer");
    expect(character.name).toBe("Archer");
    expect(character.type).toBe("Bowman");
    expect(character.health).toBe(100);
    expect(character.level).toBe(1);
    expect(character.attack).toBe(25); // Проверяем через геттер
    expect(character.defence).toBe(25);
    expect(character.special).toEqual([]);
  });

  test("Проверка имени на длину, если короткое", () => {
    expect(() => new Character("M", "Bowman")).toThrow(
      "Имя должно содержать от 2 до 10 символов",
    );
  });

  test("Проверка имени на длину, если длинное", () => {
    expect(() => new Character("VeryLongName", "Bowman")).toThrow(
      "Имя должно содержать от 2 до 10 символов",
    );
  });

  test("Проверка типа персонажа", () => {
    expect(() => new Character("Hero", "Invalid")).toThrow(
      "Тип должен быть одним из: Bowman, Swordsman, Magician, Daemon, Undead, Zombie",
    );
  });

  test("Повышение уровня героя", () => {
    const character = new Bowman("Archer");
    character.levelUp();
    expect(character).toEqual({
      name: "Archer",
      type: "Bowman",
      health: 100,
      level: 2,
      _baseAttack: 30, // 25 * 1.2
      defence: 30, // 25 * 1.2
      special: [],
    });
  });

  test("Исключение при повышении уровня для Character без attack/defence", () => {
    const character = new Character("Hero", "Bowman");
    expect(() => character.levelUp()).toThrow(
      "Нельзя повысить уровень: attack или defence не заданы",
    );
  });

  test("Исключение, при повышении уровня, если герой умер", () => {
    const character = new Bowman("Archer");
    character.health = 0;
    expect(() => character.levelUp()).toThrow("Нельзя повысить левел умершего");
  });

  test("Тест нанесения урона", () => {
    const character = new Bowman("Archer");
    character.damage(50);
    expect(character.health).toBe(62.5); // 100 - 50 * (1 - 25/100)
    character.damage(125);
    expect(character.health).toBe(0); // 62.5 - 125 * (1 - 25/100)
  });

  test("Исключение при нанесении урона для Character без defence", () => {
    const character = new Character("Hero", "Bowman");
    expect(() => character.damage(50)).toThrow(
      "Нельзя нанести урон: defence не задано",
    );
  });

  test("Тест нанесение отрицательного урона", () => {
    const character = new Bowman("Archer");
    character.damage(-50);
    expect(character.health).toBe(137.5); // 100 - (-50) * (1 - 25/100)
  });
});

describe("character classes", () => {
  test.each([
    [Bowman, "Bowman", { attack: 25, defence: 25 }],
    [Swordsman, "Swordsman", { attack: 40, defence: 10 }],
    [
      Magician,
      "Magician",
      { attack: 10, defence: 40, _stoned: false, _distance: 1 },
    ],
    [
      Daemon,
      "Daemon",
      { attack: 10, defence: 40, _stoned: false, _distance: 1 },
    ],
    [Undead, "Undead", { attack: 25, defence: 25 }],
    [Zombie, "Zombie", { attack: 40, defence: 10 }],
  ])(
    "should create %p with correct attributes",
    (Class, type, expectedProps) => {
      const character = new Class("Hero");
      expect(character).toMatchObject({
        name: "Hero",
        type,
        health: 100,
        level: 1,
        special: [],
      });
      expect(character.attack).toBe(expectedProps.attack);
      expect(character.defence).toBe(expectedProps.defence);

      if ("_stoned" in expectedProps) {
        expect(character._stoned).toBe(expectedProps._stoned);
      }
      if ("_distance" in expectedProps) {
        expect(character._distance).toBe(expectedProps._distance);
      }
    },
  );
});
