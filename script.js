class Calculator {
  constructor(previousValueTextEl, currentValueTextEl) {
    this.previousValueTextEl = previousValueTextEl;
    this.currentValueTextEl = currentValueTextEl;
    this.resetFlag = false;
    this.clear();
  }

  clear() {
    this.previousValue = '';
    this.currentValue = '';
    this.operation = undefined;
  }

  delete() {
    this.currentValue = this.currentValue.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentValue.includes('.')) return;
    this.currentValue = this.currentValue.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentValue === '') return;
    if (this.previousValue !== '' && this.currentValue !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousValue = this.currentValue;
    this.currentValue = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }

  }

  compute() {
    let result;
    const previousValue = parseFloat(this.previousValue);
    const currentValue = parseFloat(this.currentValue);

    if (isNaN(previousValue) || isNaN(currentValue)) return;

    switch (this.operation) {
      case '+':
        result = previousValue + currentValue;
        break;
      case '-':
          result = previousValue - currentValue;
          break;
      case 'x':
          result = previousValue * currentValue;
          break;
      case '÷':
          result = previousValue / currentValue;
          break;
      default:
        return;
    }

    this.resetFlag = true;
    this.currentValue = result;
    this.operation = undefined;
    this.previousValue = '';
  }

  updateDisplay() {
    this.currentValueTextEl.innerText = this.getDisplayNumber(this.currentValue);
    if (this.operation != null) {
      this.previousValueTextEl.innerText = `${this.getDisplayNumber(this.previousValue)} ${this.operation}`;
    } else {
      this.previousValueTextEl.innerText = '';
    }
  }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const decimalButton = document.querySelector('[data-decimal]');
const equalsButton = document.querySelector('[data-equals]');
const previousValueTextEl = document.querySelector('[data-previous-value]');
const currentValueTextEl = document.querySelector('[data-current-value]');

const calculator = new Calculator(previousValueTextEl, currentValueTextEl);

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (calculator.previousValue === ''
      && calculator.currentValue !== ''
      && calculator.resetFlag) {
        calculator.clear();
        calculator.resetFlag = false;
    }
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

decimalButton.addEventListener('click', () => {
  if (calculator.previousValue === ''
      && calculator.currentValue !== ''
      && calculator.resetFlag) {
        calculator.clear();
        calculator.resetFlag = false;
    }
  calculator.appendNumber(decimalButton.innerText);
  calculator.updateDisplay();
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});