// Mengambil elemen layar kalkulator
const display = document.getElementById("display");

let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;
let resetAfterResult = false;

// Menampilkan angka pada layar
function addNumber(number) {
    if (display.value === "Error") {
        display.value = number;
        resetAfterResult = false;
        return;
    }

    if (
        waitingForSecondNumber ||
        resetAfterResult ||
        display.value === "0"
    ) {
        display.value = number;
        waitingForSecondNumber = false;
        resetAfterResult = false;
    } else if (display.value.length < 15) {
        display.value += number;
    }
}

// Memilih operator matematika
function chooseOperator(selectedOperator) {
    if (display.value === "Error") return;

    if (operator !== null && !waitingForSecondNumber) {
        calculate();
    }

    firstNumber = Number(display.value);
    operator = selectedOperator;
    waitingForSecondNumber = true;
    resetAfterResult = false;
}

// Melakukan perhitungan
function calculate() {
    if (
        operator === null ||
        waitingForSecondNumber ||
        display.value === "Error"
    ) {
        return;
    }

    const secondNumber = Number(display.value);
    let result;

    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":
            if (secondNumber === 0) {
                display.value = "Error";
                firstNumber = null;
                operator = null;
                waitingForSecondNumber = false;
                resetAfterResult = true;
                return;
            }

            result = firstNumber / secondNumber;
            break;
    }

    if (!Number.isFinite(result)) {
        display.value = "Error";
    } else {
        result = Number(result.toPrecision(12));
        display.value = String(result);
    }

    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    resetAfterResult = true;
}

// Menambahkan tanda desimal
function addDecimal() {
    if (display.value === "Error") {
        display.value = "0.";
        resetAfterResult = false;
        return;
    }

    if (waitingForSecondNumber || resetAfterResult) {
        display.value = "0.";
        waitingForSecondNumber = false;
        resetAfterResult = false;
        return;
    }

    if (!display.value.includes(".")) {
        display.value += ".";
    }
}

// Menghapus semua angka
function clearDisplay() {
    display.value = "0";
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = false;
    resetAfterResult = false;
}

// Menghapus angka terakhir
function deleteNumber() {
    if (
        display.value === "Error" ||
        resetAfterResult ||
        waitingForSecondNumber
    ) {
        clearDisplay();
        return;
    }

    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);

        if (display.value === "-") {
            display.value = "0";
        }
    } else {
        display.value = "0";
    }
}

// Menghitung persentase
function percentage() {
    if (display.value === "Error") return;

    const result = Number(display.value) / 100;

    display.value = String(result);
    resetAfterResult = true;
    waitingForSecondNumber = false;
}
