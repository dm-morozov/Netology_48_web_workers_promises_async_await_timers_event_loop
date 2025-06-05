// __tests__/GameSavingLoader_async_await.test.js

import GameSavingLoader_async_await from "../GameSavingLoader_async_await.js";

// мокаем модули
jest.mock("../reader.js");
jest.mock("../parser.js");

import json from "../parser.js";
import read from "../reader.js";

describe("GameSavingLoader_async_await", () => {
  afterEach(() => {
    jest.clearAllMocks(); // очищаем моки после теста
    jest.clearAllTimers();
  });

  test("должен вернуть объект при успешной загрузке", async () => {
    const buffer = new ArrayBuffer(8);
    const jsonString =
      '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';

    read.mockResolvedValue(buffer);
    json.mockResolvedValue(jsonString);

    const result = await GameSavingLoader_async_await.load();

    expect(read).toHaveBeenCalled();
    expect(json).toHaveBeenCalledWith(buffer);
    expect(result).toEqual(JSON.parse(jsonString));
  });

  test("выбросит ошибку при сбое чтения read()", async () => {
    const error = new Error("Ошибка чтения");
    read.mockRejectedValue(error);

    await expect(GameSavingLoader_async_await.load()).rejects.toThrow(
      "Ошибка чтения",
    );
  });
});
