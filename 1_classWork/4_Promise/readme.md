С удовольствием! Вот **небольшая практическая задача** для новичка по теме `Promise.all`, `then`, `catch` и асинхронности:

---

## 📌 ЗАДАЧА: Загрузка данных с задержкой

### Условие:

У тебя есть функция `loadData(id)`, которая **имитирует загрузку данных с сервера** с помощью `Promise` и `setTimeout`. Твоя задача — с помощью `Promise.all`:

1. Запустить **параллельно** загрузку данных по трём `id`: 1, 2 и 3.

2. После завершения всех загрузок:

  - вывести массив полученных данных.

3. Если при загрузке хотя бы одного `id` произошла ошибка — вывести сообщение об ошибке.

---

### 🔧 Начальный код:

```JavaScript
function loadData(id) {
  return new Promise((resolve, reject) => {
    const delay = Math.floor(Math.random() * 2000) + 500;

    setTimeout(() => {
      if (Math.random() < 0.8) {
        resolve(`Данные для ID ${id}`);
      } else {
        reject(`Ошибка при загрузке ID ${id}`);
      }
    }, delay);
  });
}

// TODO: Добавь решение здесь
```


---

### 🧠 Подсказки:

- Используй `Promise.all([...])`, передав туда три вызова `loadData(...)`.

- Используй `.then(...)` для обработки успешного результата.

- Используй `.catch(...)` для обработки ошибок.

---

Хочешь, я помогу с решением, если ты застрянешь или хочешь сверить свой ответ.



```JavaScript
function loadData(id) {
    return new Promise((resolve, reject) => {
      const delay = Math.floor(Math.random() * 2000) + 500;
  
      setTimeout(() => {
        if (Math.random() < 0.8) {
          resolve(`Данные для ID ${id}`);
        } else {
          reject(`Ошибка при загрузке ID ${id}`);
        }
      }, delay);
    });
  }
  
  // TODO: Добавь решение здесь

const p1 = loadData(1);
const p2 = loadData(2);
const p3 = loadData(3);
Promise.all([p1, p2, p3])
    .then(result => console.log(result))
    .catch(error => console.error(error))
  
```




Отлично! 🎉

Ты **абсолютно правильно решил задачу** — молодец!
Вот короткий разбор твоего кода:

---

### ✅ Что ты сделал правильно:

4. **Вызвал `loadData(1)`, `loadData(2)`, `loadData(3)`** и сохранил их в переменные `p1`, `p2`, `p3`.

5. **Передал массив промисов в `Promise.all(...)`** — всё верно.

6. **Использовал `.then(...)` для обработки результатов** — верно, ты получишь массив строк.

7. **Добавил `.catch(...)` для обработки ошибок** — отлично! Если хотя бы один `loadData(...)` завершится с ошибкой, ты её увидишь.

---

### 💡 Что можно улучшить (опционально):

Чтобы код был короче и аккуратнее, ты можешь не сохранять `p1`, `p2`, `p3`, а сразу вызвать функции внутри `Promise.all`:

```JavaScript
Promise.all([
  loadData(1),
  loadData(2),
  loadData(3)
])
  .then(result => console.log('Результаты:', result))
  .catch(error => console.error('Ошибка:', error));
```


---

### 🧪 Что будет происходить:

- Примерно через 0.5–2.5 секунды все 3 `loadData(...)` промиса завершатся.

- Если **все 3 успешно** — увидишь:
`Результаты: ['Данные для ID 1', 'Данные для ID 2', 'Данные для ID 3']`

- Если **хотя бы один промис упадёт** — увидишь, например:
`Ошибка: Ошибка при загрузке ID 2`

---

Хочешь следующую задачку — например, на `Promise.allSettled` или `Promise.race`?

