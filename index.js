let firstNumber = '',
    secondNumber = '',
    operator = '',
    finish = false;

const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'],
    operation = ['-', '+', 'X', '/', '%'];

const result = document.querySelector('.result'),
    plusMinus = document.querySelector('[data-switcher]');

function clearAll() {
    firstNumber = '',
        secondNumber = '',
        operator = '',
        finish = false,
        result.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').addEventListener('click', (e) => {
    if (!e.target.classList.contains('button')) return;

    if (e.target.classList.contains('ac')) return;

    result.textContent = '';

    const key = e.target.textContent;

    if (values.includes(key)) {
        if (secondNumber === '' && operator === '') {
            if (key === '0' && firstNumber === '') {
                result.textContent = '0';
                return;
            } else {
                if (firstNumber.length > 10) {
                    result.textContent = firstNumber;
                    return;
                }
                firstNumber += key;
                result.textContent = firstNumber;
            }

        }
        else if (firstNumber !== '' && secondNumber !== '' && finish) {
            if (key === '0') {
                secondNumber = '0';
                result.textContent = firstNumber;
                return;
            } else {
                secondNumber = key;
                finish = false;
                result.textContent = secondNumber;
            }
        }
        else {
            if (key === '0' && secondNumber === '') {
                result.textContent = operator;
                return;
            } else {
                if (secondNumber.length > 10) {
                    result.textContent = secondNumber;
                    return;
                }
                secondNumber += key;
                result.textContent = secondNumber;
            }

        }
        console.log(firstNumber, operator, secondNumber);
        return;
    }

    if (operation.includes(key)) {
        if (firstNumber === '') {
            result.textContent = '0';
            return;
        } else {
            operator = key;
            result.textContent = operator;
            console.log(operator);
            return;
        }

    }

    if (e.target.classList.contains('switcher')) {
        if (firstNumber === '' && operator === '' && secondNumber === '' && finish === false) {
            result.textContent = '0';
        }
        if (firstNumber != '' && operator === '' && secondNumber === '') {
            firstNumber = firstNumber * (-1);
            result.textContent = firstNumber;
        } else if (firstNumber != '' && operator != '' && secondNumber != '' && finish === false) {
            secondNumber = secondNumber * (-1);
            result.textContent = secondNumber;
        } else if (firstNumber != '' && operator != '' && secondNumber != '' && finish === true) {
            firstNumber = firstNumber * (-1);
            result.textContent = firstNumber;
        }
    }

    if (key === '=') {
        if (firstNumber === '' && operator === '' && secondNumber === '') {
            result.textContent = '0';
            return;
        }
        switch (operator) {
            case "+":
                if (secondNumber === '') secondNumber = firstNumber;
                firstNumber = (+firstNumber) + (+secondNumber);
                break;
            case "-":
                if (secondNumber === '') secondNumber = firstNumber;
                firstNumber = firstNumber - secondNumber;
                break;
            case "X":
                if (secondNumber === '') secondNumber = firstNumber;
                firstNumber = firstNumber * secondNumber;
                break;
            case "/":
                if (secondNumber === '') secondNumber = firstNumber;
                if (secondNumber === '0') {
                    result.textContent = 'Error';
                    a = '';
                    b = '';
                    operator = '';
                    return;
                }
                firstNumber = firstNumber / secondNumber;
                break;
            case "%":
                if (secondNumber === '') {
                    secondNumber = 100;
                    firstNumber = firstNumber / secondNumber;
                    result.textContent = firstNumber;
                    a = '';
                    b = '';
                    operator = '';
                    return;
                }
                firstNumber = secondNumber * (firstNumber / 100);
                break;
        }
        finish = true;
        if (firstNumber.toString().split('').length > 10) {
            result.textContent = firstNumber.toString().slice(0, 12);
        } else {
            result.textContent = firstNumber;
        }
    }
})