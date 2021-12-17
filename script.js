let runningTotal = 0;
let buffer = "0";
let previousOperator;
const screen = document.querySelector(".screen");

//function to find input is whether a symbol or number
function buttonClick(value) {
  //debugger;
  console.log(value);
  if (isNaN(value)) {
    //this is not a number
    handleSymbol(value);
  } else {
    //this is a number
    handleNumber(value);
  }
  screen.innerText = buffer;
  //   rerender();
}
//FUnction to handle symbol
function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
    case "=":
      if (previousOperator === null) {
        //you need two numbers to do math
        return;
      }
      flushOperation(parseInt(buffer));
      //returned after flush operation and came back to this point
      previousOperator = null;
      buffer = runningTotal; 
      runningTotal = 0;
      break;
    case '-':
    case "+":
    case "×":
    case "÷":
        handleMath(symbol);
        break;
  }
}

function handleMath(symbol) {
  //console.log("Symbol ", symbol);
  if (buffer === 0) {
    return;
  }
  const intBuffer = parseInt(buffer); //converting numberString to number
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}
//Function to flush the operation
function flushOperation(intBuffer) {
  switch (previousOperator) {
    case "+": //addition
      runningTotal += intBuffer;
      break;
    case "-": //subtarction
      runningTotal -= intBuffer;
      break;
    case "×": //multiplication
      runningTotal *= intBuffer;
      break;
    case "÷": //division
      runningTotal /= intBuffer;
      break;
  }
  //console.log("Running Total ", runningTotal);
}
//FUnction to handle Number
function handleNumber(numberString) {
  //console.log('numberString',numberString);
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      //    console.log(event)
      buttonClick(event.target.innerText);
    });
}

init();
