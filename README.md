# Домашнее задание к лекции «Promises, async/await»

[![Build status](https://ci.appveyor.com/api/projects/status/2vtijabxpv47d38b?svg=true)](https://ci.appveyor.com/project/dm-morozov/netology-48-web-workers-promises-async-await-timer)
![Netology](https://img.shields.io/badge/Netology-JavaScript-blue)
![Jest Coverage](https://img.shields.io/badge/Покрытие-100%25-brightgreen)

## 📖 Описание

Этот проект создан в рамках домашнего задания к лекции [«Promises, Async/Await» курса JavaScript от Нетологии](./README_for_Netology.md). Реализованы три задачи, связанные с асинхронным программированием: загрузка игрового сохранения с использованием Promise, переработка с `async/await` и тестирование асинхронного кода с моками. Проект построен на шаблоне Webpack, код проходит ESLint без ошибок, тесты обеспечивают 100% покрытие по строкам.

**Цели**:
- Реализовать класс `GameSavingLoader` для загрузки игровых сохранений.
- Переписать загрузку с использованием `async/await`.
- Протестировать асинхронный код с моками для обработки ошибок.

## 🛠 Что сделано

### 1. `Promises`: Класс `GameSavingLoader` с Promise
- **Задача**: Реализовать загрузку игрового сохранения с использованием Promise.
- **Реализация**:
  - Класс `GameSavingLoader` с методом `load`, который:
    - Вызывает функцию `read()` для получения `ArrayBuffer`.
    - Использует `json()` для преобразования в строку.
    - Парсит строку в объект `GameSaving` с полями `id`, `created`, `userInfo`.
  - Метод возвращает `Promise`, который разрешается объектом сохранения.
- **Файлы**:
  - `src/js/GameSavingLoader.js`: Реализация с Promise.
  - `src/js/reader.js`, `src/js/parser.js`: Заглушки для чтения и парсинга.
- **Пример**:
  ```javascript
  GameSavingLoader.load().then((saving) => console.log(saving));
  ```

### 2. `Async/Await`: Переработка с `async/await`
- **Задача**: Переписать `GameSavingLoader.load` с использованием `async/await`.
- **Реализация**:
  - Создан класс `GameSavingLoader_async_await` с методом `load`, использующим `async/await`.
  - Обработка ошибок через `try-catch`.
  - Использован async IIFE в `app.js` для вызова метода.
- **Файлы**:
  - `src/js/GameSavingLoader_async_await.js`: Реализация с `async/await`.
  - `src/js/app.js`: Async IIFE для демонстрации.
- **Пример**:
  ```javascript
  (async () => {
    try {
      const saving = await GameSavingLoader_async_await.load();
      console.log(saving);
    } catch (error) {
      console.error(error);
    }
  })();
  ```

### 3. `Testing Async Code` (дополнительно): Тестирование с моками
- **Задача**: Протестировать асинхронный код с моками для `read` и `json`.
- **Реализация**:
  - Замоканы функции `read` и `json` с помощью `jest.mock`.
  - Тесты проверяют:
    - Успешную загрузку с возвратом объекта `GameSaving`.
    - Обработку ошибок при сбое `read`.
  - Использованы `jest.useFakeTimers` и `jest.advanceTimersByTime` для управления `setTimeout`.
- **Файлы**:
  - `src/js/__tests__/GameSavingLoader_async_await.test.js`: Тесты с моками.
- **Покрытие**: 100% по строкам, веткам, функциям.

## 📚 Чему научились

- **Асинхронное программирование**:
  - Работа с `Promise` для последовательной обработки данных.
  - Использование `async/await` для упрощения асинхронного кода.
  - Обработка ошибок с `try-catch` и `.catch`.
- **Тестирование асинхронного кода**:
  - Мокация модулей с `jest.mock`.
  - Управление таймерами с `jest.useFakeTimers` и `jest.advanceTimersByTime`.
  - Тестирование `resolve` и `reject` сценариев.
- **Инструменты**:
  - Настройка Webpack для работы с модулями.
  - Использование ESLint (Airbnb) для чистоты кода.
  - Интеграция с CI (AppVeyor) для автоматической проверки.
- **Практика**:
  - Работа с `ArrayBuffer` и преобразованием данных.
  - Интеграция асинхронных операций в игровой проект.

## 🚀 Инструкции по запуску

1. **Клонируйте репозиторий**:
   ```bash
   git clone https://github.com/dm-morozov/Netology_47_ArrayBuffer.git
   cd Netology_47_ArrayBuffer
   ```

2. **Установите зависимости**:
   ```bash
   npm install
   ```

3. **Проверьте код**:
   - Линтер:
     ```bash
     npm run lint
     npm run lint:fix
     ```
   - Тесты:
     ```bash
     npm run test
     npm run test -- --coverage
     ```

4. **Запустите проект**:
   ```bash
   npm start
   ```
   Откройте `http://localhost:8080` и проверьте консоль браузера (F12).

5. **Результаты в консоли**:
   - Вывод успешной загрузки объекта `GameSaving`.
   - Обработка ошибок при сбое чтения.

## 🛠 Технологии

- **JavaScript (ES6+)**: `Promise`, `async/await`, `ArrayBuffer`.
- **Webpack**: Сборка проекта.
- **Jest**: Unit-тесты с 100% покрытием.
- **ESLint**: Проверка стиля кода (Airbnb).
- **Babel**: Транспиляция для совместимости.
- **AppVeyor**: CI для автоматической проверки.

## 📧 Контакты

Если возникнут вопросы, пишите:
- ![LinkedIn](./svg/linkedin-icon.svg) [LinkedIn](https://www.linkedin.com/in/dm-morozov/)
- ![Telegram](./svg/telegram.svg) [Telegram](https://t.me/dem2014)
- ![GitHub](./svg/github-icon.svg) [GitHub](https://github.com/dm-morozov/)