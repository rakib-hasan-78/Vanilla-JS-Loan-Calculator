import { inputFocusHandler , formClickHandler} from "./js/handlers.js";
import { inputValidationHandlers } from "./js/validation.js";

const loanForm = document.getElementById('calculator-form');
const loanAmountInput = document.getElementById('amount');
const loanInterest = document.getElementById('loan-interest');
const YearsToPay = document.getElementById('years-to-pay');
const submitBtn = document.getElementById('btn-submit');
const spinningLoader = document.getElementById('loading');

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

formClickHandler(
    '#calculator-form',
    '#calculator-form .form-group .input-group',
    'input',
    'span i',
    'text-orange-400'
);

inputValidationHandlers(
    '#calculator-form .form-group .input-group',
    'span i',
    'input'
)


loanForm.addEventListener('submit', (e)=>{

    e.preventDefault();
    
    spinningLoader.classList.remove('d-none');

    setTimeout(()=>{
        spinningLoader.classList.add('d-none');
        resultSection.classList.remove('d-none');
    },4000);
});




