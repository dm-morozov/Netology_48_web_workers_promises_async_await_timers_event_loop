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
  