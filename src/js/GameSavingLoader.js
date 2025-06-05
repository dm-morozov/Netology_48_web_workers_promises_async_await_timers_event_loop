import json from "./parser.js";
import read from "./reader.js";

export default class GameSavingLoader {
  static load() {
    return read()
      .then((buffer) => json(buffer))
      .then((stringData) => JSON.parse(stringData));
  }
}
