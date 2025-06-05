import json from "./parser.js";
import read from "./reader.js";

export default class GameSavingLoader_async_await {
  static async load() {
    const reader = await read();
    const stringData = await json(reader);
    return JSON.parse(stringData);
  }
}
