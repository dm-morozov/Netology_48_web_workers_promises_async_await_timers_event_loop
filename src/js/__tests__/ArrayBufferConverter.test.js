// ArrayBufferConverter.test.js

import ArrayBufferConverter from "../ArrayBufferConverter.js";
import getBuffer from "../getBuffer.js";

describe("ArrayBufferConverter", () => {
  let converter, buffer;

  beforeEach(() => {
    converter = new ArrayBufferConverter();
    buffer = getBuffer();
  });

  test("Проверяем условие, если мы не загрузили буфер", () => {
    expect(() => converter.toString()).toThrow(
      "Буфер не загружен, воспользуйтесь командой load(тут укажите буфер, который стоит переконвертировать в строку)",
    );
  });

  test("Проверяем функцию load и convertString, если значения поданы коректные", () => {
    converter.load(buffer);
    const stringResult = converter.toString();
    expect(stringResult).toEqual(
      `{"data":{"user":{"id":1,"name":"Hitman","level":10}}}`,
    );
    expect(converter.convertString()).toEqual({
      data: { user: { id: 1, name: "Hitman", level: 10 } },
    });
  });

  test("Конвертация в JSON, если строка некорректная", () => {
    converter.load(buffer);
    converter.stringJSON += "error"; // добавляем в строку лишний текст, чтобы развалить json строку
    expect(() => converter.convertString()).toThrow(`Ошибка парсинга:`);
  });

  test("Если мы конвертируем в объект JS сразу, не используя промежуточный toString()", () => {
    converter.load(buffer);
    const objectResult = converter.convertString();
    expect(objectResult).toEqual({
      data: { user: { id: 1, name: "Hitman", level: 10 } },
    });
  });
});
