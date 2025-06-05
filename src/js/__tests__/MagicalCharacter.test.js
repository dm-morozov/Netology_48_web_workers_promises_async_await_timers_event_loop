// MagicalCharacter.test.js

import Daemon from "../Daemon.js";
import Magician from "../Magician.js";

describe("MagicalCharacter", () => {
  let magician, daemon;

  beforeEach(() => {
    magician = new Magician("Mage");
    daemon = new Daemon("Demon");
  });

  test("Проверяем геттер stoned, должен вернуть false", () => {
    expect(magician.stoned).toBe(false);
    expect(daemon.stoned).toBe(false);
  });

  test("Изменяем stoned, разными смособами и дожны получить будево значение true or false", () => {
    magician.stoned = true;
    expect(magician.stoned).toBe(true);
    daemon.stoned = 0;
    expect(daemon.stoned).toBe(false);
  });

  test("Проверяем геттер и сеттре distance", () => {
    expect(magician.distance).toBe(1);
    expect(() => (magician.distance = -1)).toThrow(
      "Расстояние должно быть от 1 до 5 клеток",
    );
    expect(() => (magician.distance = 0)).toThrow(
      "Расстояние должно быть от 1 до 5 клеток",
    );
    expect(() => (magician.distance = 6)).toThrow(
      "Расстояние должно быть от 1 до 5 клеток",
    );
    daemon.distance = 2;
    expect(daemon.distance).toBe(2);
  });

  test("Проверяем get | set attack()", () => {
    expect(magician.attack).toBe(10);
    magician.attack = undefined;
    expect(magician.attack).toEqual(undefined);
  });

  test("Как и в предыщем примере защищаем атаку даже если _distance станет отрицательным, атака будет нулевая", () => {
    magician._distance = 0;
    expect(magician.attack).toBe(0);
  });

  test("Моделируем ситуация, когда происходит и уменьшешние атаки по расстоянию и по дурману", () => {
    magician.distance = 2;
    expect(magician.attack).toBe(9);
    magician.stoned = true;
    expect(magician.attack).toBe(4);
  });
});
