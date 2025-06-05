const input = document.getElementById('numberInput');
const button = document.getElementById('doubleBtn');
const resultDiv = document.querySelector('.result');
console.log(resultDiv);

const worker = new Worker('web_workers.js');

button.addEventListener('click', () => {
    const number = +input.value;
    if (isNaN(number) || typeof number === 'undefined') {
        resultDiv.textContent = "Введите корректное число";
        return;
    }
    console.log(number);
    worker.postMessage(number);
});

worker.addEventListener('message', (event) => {
    resultDiv.textContent = `Результат: ${event.data}`;
});