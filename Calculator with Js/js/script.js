document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display input');
    let currentOperation = null; // Store the current operation
    let storedValue = ''; // Store the value before an operation

    // Event delegation for all button clicks in the calculator
    document.querySelector('.buttons').addEventListener('click', function(event) {
        if (!event.target.classList.contains('button')) return; // Ignore non-button clicks

        const buttonValue = event.target.textContent;
        
        if (event.target.classList.contains('number') || buttonValue === '.') {
            handleNumberInput(buttonValue);
        } else if (event.target.classList.contains('operator')) {
            handleOperator(buttonValue);
        } else if (buttonValue === '=') {
            if (currentOperation) {
                calculateResult(parseFloat(storedValue), parseFloat(display.value), currentOperation);
                currentOperation = null; // Reset operation after calculation
            }
        } else if (event.target.classList.contains('clear')) {
            clearAll();
        }
    });

    function handleNumberInput(value) {
        if (display.value === '0' || currentOperation && storedValue !== '') {
            display.value = ''; // Clear the display or prepare for new input
        }
        display.value += value; // Append number or decimal point
    }

    function handleOperator(operator) {
        if (currentOperation && storedValue !== '') {
            // If an operator is already active and there's a previous value, calculate first
            calculateResult(parseFloat(storedValue), parseFloat(display.value), currentOperation);
        } else {
            storedValue = display.value; // Store current display value
        }
        currentOperation = operator; // Set current operator
        display.value = ''; // Clear display for next number
    }

    function calculateResult(firstValue, secondValue, operator) {
        let result = 0;
        switch (operator) {
            case '+':
                result = firstValue + secondValue;
                break;
            case '-':
                result = firstValue - secondValue;
                break;
            case '*':
                result = firstValue * secondValue;
                break;
            case '/':
                if (secondValue === 0) {
                    alert("Division by zero is undefined.");
                    clearAll();
                    return;
                } else {
                    result = firstValue / secondValue;
                }
                break;
            default:
                return; // No operation to perform
        }
        display.value = result;
        storedValue = ''; // Reset stored value
    }

    function clearAll() {
        display.value = '0'; // Reset display
        currentOperation = null; // Clear current operation
        storedValue = ''; // Clear stored value
    }
});
