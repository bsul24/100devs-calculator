"use strict";

const numBtns = document.querySelectorAll(".num-btn");
const decimalBtn = document.querySelector(".decimal-btn");
const equalsBtn = document.querySelector(".equals-btn");
const operatorBtns = document.querySelectorAll(".operator-btn");
const output = document.querySelector(".output");

// STATE
let previousOperand = undefined;
let currentOperand = undefined;
let curOperator = undefined;
let lastBtnPressed = undefined;

numBtns.forEach((btn) => btn.addEventListener("click", handleNumber));
decimalBtn.addEventListener("click", handleDecimal);
operatorBtns.forEach((btn) => btn.addEventListener("click", handleOperator));
equalsBtn.addEventListener("click", handleEquals);

function handleNumber(e) {
  if (output.textContent === "0" || lastBtnPressed === "operator") {
    output.textContent = e.target.textContent;
  } else if (output.textContent.length > 9) {
    return;
  } else {
    output.textContent += e.target.textContent;
  }

  lastBtnPressed = "num";
}

function handleDecimal(e) {
  if (output.textContent.includes(".")) return;

  output.textContent += ".";
  lastBtnPressed = "num";
}

function handleOperator(e) {
  const ops = {
    "+": add,
    "-": subtract,
    X: multiply,
    "/": divide,
  };
  if (
    previousOperand &&
    lastBtnPressed !== "operator" &&
    lastBtnPressed !== "equals"
  ) {
    output.textContent = String(
      operate(previousOperand, output.textContent, curOperator)
    ).slice(0, 10);
  }
  curOperator = ops[e.target.textContent];
  previousOperand = output.textContent;
  lastBtnPressed = "operator";
}

function handleEquals(e) {
  if (!curOperator) return;

  operatorNum = output.textContent;
  output.textContent = String(
    operate(savedNum, output.textContent, curOperator)
  ).slice(0, 10);
  savedNum = output.textContent;
}

function operate(num1, num2, operator) {
  return operator(+num1, +num2);
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) return "Error";

  return num1 / num2;
}
