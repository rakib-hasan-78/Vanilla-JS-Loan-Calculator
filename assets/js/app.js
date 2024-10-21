import { errorFunction } from "../js/js/errorDiv.js";
import { inputFocusHandler } from "./js/handlers.js";

const loanForm = document.getElementById('calculator-form');
const loanAmountInput = document.getElementById('amount');
const loanInterest = document.getElementById('loan-interest');
const YearsToPay = document.getElementById('years-to-pay');
const submitBtn = document.getElementById('btn-submit');

// result inputs ---->
const resultSection = document.getElementById('result');
const monthlyPay = document.getElementById('monthly-payment');
const grossPayment = document.getElementById('gross-payment');
const grossInterest = document.getElementById('gross-interest');


inputFocusHandler(

    '#calculator-form .form-group .input-group',
    'span i',
    'input', 
    'text-orange-400'
);

const form = document.querySelector('#calculator-form');
form.addEventListener('click', ()=>{
    const containers = document.querySelectorAll('#calculator-form .form-group .input-group');
    [...containers].map(container=>{
        const input = container.querySelector('input');
        const span = container.querySelector('span i');

        // if input is not focused 
        if (document.activeElement!== input) {
            if (!input.value) {
                span.classList.remove('text-orange-400');
            }
        }

    });
});




// Call the function
// errorFunction();






