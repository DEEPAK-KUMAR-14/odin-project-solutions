// Arithmetic functions
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    alert("Cannot divide by zero!");
    return null;
  }
  return a / b;
}

function operate(op, a, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}

// Calculator state
let firstValue = null;
let operator = null;
let secondValue = false;
const display = document.getElementById("display");

document.querySelectorAll("[data-digit]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (secondValue) {
      display.textContent = btn.textContent;
      secondValue = false;
    } else {
      display.textContent =
        display.textContent === "0"
          ? btn.textContent
          : display.textContent + btn.textContent;
    }
  });
});

document.querySelectorAll("[data-operator]").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (operator && !secondValue) {
      const result = operate(operator, firstValue, display.textContent);
      display.textContent = result === null ? "0" : String(result);
    }
    firstValue = display.textContent;
    operator = btn.getAttribute("data-operator");
    secondValue = true;
  });
});

document.getElementById("equals").addEventListener("click", () => {
  if (!operator) return;
  const result = operate(operator, firstValue, display.textContent);
  display.textContent = result === null ? "0" : String(result);
  operator = null;
  secondValue = true;
});

document.getElementById("decimal").addEventListener("click", () => {
  if (secondValue) {
    display.textContent = "0.";
    secondValue = false;
    return;
  }
  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
});

document.getElementById("clear").addEventListener("click", () => {
  display.textContent = "0";
  firstValue = null;
  operator = null;
  secondValue = false;
});
