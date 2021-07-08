const display = document.getElementById("display");
const clear = document.getElementById("clear");
const dot = document.getElementById("dot");
const equal = document.getElementById("equal");

clear.onclick = pressClear;
dot.onclick = enterDot;
equal.onclick = evaluate;

document.querySelectorAll(".digit").forEach(num => {
  num.onclick = () => {
    enterDigit(+num.textContent);
  };
});

document.querySelectorAll(".operator").forEach(op => {
  op.onclick = () => {
    enterOperator(op.id);
  };
});

let decimalPlaces = 0;
let currentValue = 0;
let input = 0;
let previousOperator;
let previousButton;

function enterDigit(digit) {
  if (previousButton == "equal") {
    input = 0;
    decimalPlaces = 0;
    dot.classList.remove("disabled");
  }
  if (decimalPlaces == 0) {
    input = input * 10 + digit;
  } else {
    input = input + 10 ** -decimalPlaces * digit;
    decimalPlaces++;
  }
  display.textContent = input;
  if (input != 0) clear.textContent = "C";
  previousButton = "digit";
}

function enterOperator(operator) {
  if (previousButton == "digit" || previousButton == "dot" 
      || previousButton == "equal") {
    currentValue = operate(currentValue, input, previousOperator);
    display.textContent = currentValue;
    input = 0;
    decimalPlaces = 0;
  }
  previousOperator = operator;
  previousButton = "operator";
}

function operate(a, b, operator) {
  switch (operator) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return a / b;
    case "power":
      return a ** b;
    case "root":
      return Math.pow(a, 1 / b);
    default:
      return b; // if prevOp undefined, return input
  }
}

function pressClear() {
  if (display.textContent == "0") { // AC
    currentValue = 0;
  } else { // C
    clear.textContent = "AC";
    input = 0;
    display.textContent = "0";
    decimalPlaces = 0;
    dot.classList.remove("disabled");
  }
  previousButton = "clear";
}

function enterDot() {
  if (previousButton != "digit") {
    input = 0;
    display.textContent = "0.";
  } else {
    display.textContent += ".";
  }
  decimalPlaces = 1;
  dot.classList.add("disabled");
  previousButton = "dot";
}

function evaluate() {
  input = operate(currentValue, input, previousOperator);
  display.textContent = input;
  previousOperator = null;
  previousButton = "equal";
}