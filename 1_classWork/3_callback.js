function sum(a, b) { 
    return a + b;
}

function mult(a, b) { 
    return a * b;
}

function sub(a, b) { 
    return a - b;
}

function div(a, b) { 
    if (b === 0) {
        console.error("Ошибка: Деление на ноль!");
        return NaN;
    }
    return a / b;
}

function inputNumber(a, b, callback) {
    return callback(a, b);
} 

sumNumber = inputNumber(2, 4, sum);
multNumber = inputNumber(2, 4, mult);
subNumber = inputNumber(2, 4, sub);
divNumber = inputNumber(2, 4, div);

console.log(sumNumber, multNumber, subNumber, divNumber)