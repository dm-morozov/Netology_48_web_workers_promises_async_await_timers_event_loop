// index.js
import "./css/style.css";
import ArrayBufferConverter from "./js/ArrayBufferConverter.js";
import Bowman from "./js/Bowman.js";
import Character from "./js/Character.js";
import Daemon from "./js/Daemon.js";
import ErrorRepository from "./js/ErrorRepository.js";
import GameSavingLoader from "./js/GameSavingLoader.js";
import GameSavingLoader_async_await from "./js/GameSavingLoader_async_await.js";
import Magician from "./js/Magician.js";
import Swordsman from "./js/Swordsman.js";
import Team from "./js/Team.js";
import Undead from "./js/Undead.js";
import Zombie from "./js/Zombie.js";
import getBuffer from "./js/getBuffer.js";

// Для тестирования в консоли добавим классы в глобальную область видимости
window.Character = Character;
window.Bowman = Bowman;
window.Swordsman = Swordsman;
window.Magician = Magician;
window.Daemon = Daemon;
window.Undead = Undead;
window.Zombie = Zombie;

console.log("index worked");

const order = ["name", "level"];
const character = new Character("Archer", "Bowman");
console.log(character.orderByProps(order));

character.special = [
  {
    id: 8,
    name: "Двойной выстрел",
    icon: "http://...",
    description: "Двойной выстрел наносит двойной урон",
  },
  {
    id: 9,
    name: "Нокаутирующий удар",
    icon: "http://...",
  },
];
console.log(character.getSpecialAttack());

// Тестирование Team
const team = new Team();
const zombie = new Zombie("Zombie");
const swordsman = new Swordsman("Swordsman");

try {
  team.add(swordsman);
  console.log("Добавлен Мечник:", team.toArray());
  team.add(swordsman);
} catch (e) {
  console.log("Error:", e.message);
}

team.addAll(swordsman, zombie);
console.log(team.toArray());

// Тестирование ErrorRepository
const errorRepo = new ErrorRepository();
console.log("Ошибка 100:", errorRepo.translate(100)); // Недостаточно здоровья
console.log("Ошибка 999:", errorRepo.translate(999)); // Unknown error

// Тестирование Magician и Daemon
const magician = new Magician("Mage");
magician.distance = 2;
console.log("Magician attack (distance 2):", magician.attack); // 9
magician.stoned = true;
console.log("Magician attack (stoned, distance 2):", magician.attack); // 4

const daemon = new Daemon("Demon");
daemon.distance = 3;
console.log("Daemon attack (distance 3):", daemon.attack); // 8
daemon.stoned = true;
console.log("Daemon attack (stoned, distance 3):", daemon.attack); // 0

// Тестируем декодирование строки ArrayBuffer
// из файла getBuffer.js
const converter = new ArrayBufferConverter();
const buffer = getBuffer();
converter.load(buffer);
console.log(`Получаем строку json: ${converter.toString()}`);
console.log(converter.convertString());

// реализовать класс GameSavingLoader с методом load,
// который загружает данные (с помощью функции read),
// парсит их (с помощью функции json())
// и создаёт объект типа GameSaving

GameSavingLoader.load().then((saving) => console.log(saving));

// Второй способ async/await

GameSavingLoader_async_await.load()
  .then((json_data) => {
    console.log("Сохранение игры:", json_data);
  })
  .catch((error) => {
    console.log("Ошибка сохранения...", error);
  });
