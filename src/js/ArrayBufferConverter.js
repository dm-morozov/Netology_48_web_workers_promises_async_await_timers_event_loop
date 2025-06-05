// ArrayBufferConverter.js

export default class ArrayBufferConverter {
  constructor() {
    this.buffer = null;
    this.stringJSON = null;
  }

  load(buffer) {
    this.buffer = buffer;
    // Сбрасываем строку при новой загрузке
    this.stringJSON = null;
  }

  toString() {
    if (!this.buffer) {
      throw new Error(
        "Буфер не загружен, воспользуйтесь командой load(тут укажите буфер, который стоит переконвертировать в строку)",
      );
    }

    // Создаем представление для буфера.
    // Так как закодировано один символ -
    // два байта, делаем также
    const viewBuffer = new Uint16Array(this.buffer);
    // На выходе получим строку
    let stringJSON = "";
    for (let i = 0; i < viewBuffer.length; i++) {
      // Делаем посимвольное декодирование
      stringJSON += String.fromCharCode(viewBuffer[i]);
    }
    this.stringJSON = stringJSON;
    return stringJSON;
  }

  convertString() {
    if (!this.stringJSON) {
      this.toString();
    }
    try {
      return JSON.parse(this.stringJSON);
    } catch (e) {
      throw new Error(`Ошибка парсинга: ${e.message}`);
    }
  }
}
