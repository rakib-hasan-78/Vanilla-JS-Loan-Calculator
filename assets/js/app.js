import { CustomError } from "./js/customError.js";
import { errorFunction } from "./js/errorDiv.js";
import { inputFocusHandler , formClickHandler} from "./js/handlers.js";
import { numberRegex } from "./js/regex.js";
import { inputValidationHandlers } from "./js/validation.js";

const loanForm = document.getElementById('calculator-form');





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
);


loanForm.addEventListener('submit', (e)=>{
    // preventing browser reloading ----->
    e.preventDefault();
    // grabbing all inputs ----> 
    const loanAmountInput = document.getElementById('amount');
    const loanInterest = document.getElementById('loan-interest');
    const yearsToPay = document.getElementById('years-to-pay');
    const submitBtn = document.getElementById('btn-submit');
    
    // validation related variables ----->

    let isValid = false;
    let error = null;
    let allValid = true;
    
    // validation logic 
    
    if (loanAmountInput.id==='amount') {
        ({isValid, error}= numberRegex(loanAmountInput.value.trim(), 'Amount'));
    } else if (loanInterest.id ==='loan-interest') {
        ({isValid, error}=numberRegex(loanInterest.value.trim(), 'Interest') )
    } else if (yearsToPay.id==='years-to-pay'){
        ({isValid, error} = numberRegex(yearsToPay.value.trim(), 'Year'))
    }
    
    try{
        if(!isValid){
            throw new CustomError(error);
        }
    } catch(error){
        allValid = false;
        errorFunction('d-flex','d-none', `${error.message}`);
    }
    
    // if everything is fine 
    
    if (allValid) {

        errorFunction('d-none', 'd-flex', '');

        const expectedAmount = parseFloat(loanAmountInput.value.trim());
        const interestRate = parseFloat(loanInterest.value.trim());
        const loanYears = parseFloat(yearsToPay.value.trim());

        // result section 

        // result inputs ---->
        const spinningLoader = document.getElementById('loading');
        const resultSection = document.getElementById('result');
        const monthlyPay = document.getElementById('monthly-payment');
        const grossPayment = document.getElementById('gross-payment');
        const grossInterest = document.getElementById('gross-interest');


        let interestAmount = (((interestRate / 100) * expectedAmount ) * loanYears).toFixed(2);
        let totalPayment = (expectedAmount +  parseFloat(interestAmount));
        let paybackPerMonth = (totalPayment/(loanYears * 12)).toFixed(2);
        
        spinningLoader.classList.remove('d-none');

        setTimeout(()=>{
            // display handle---->
            spinningLoader.classList.add('d-none');
            resultSection.classList.remove('d-none');

            monthlyPay.value = `${paybackPerMonth}`;
            grossPayment.value = `${totalPayment}`;
            grossInterest.value = `${interestAmount}`;

            loanAmountInput.disabled = true;
            loanInterest.disabled = true;
            yearsToPay.disabled = true;

            submitBtn.setAttribute('type','button');
            submitBtn.id.replace('btn-reset', 'btn-submit');
            submitBtn.value = `Reset`
            submitBtn.classList.remove('bg-dark');
            submitBtn.classList.add('bg-danger');

        },4000);

    }

});

// // resetting calculator 

// const resettingCalculator = () => {

//     const spinningLoader = document.getElementById('loading');
//     const submitBtn = document.getElementById('btn-submit');
//     const resultSection = document.getElementById('result');
//     const monthlyPay = document.getElementById('monthly-payment');
//     const grossPayment = document.getElementById('gross-payment');
//     const grossInterest = document.getElementById('gross-interest');

//     const loanAmountInput = document.getElementById('amount');
//     const loanInterest = document.getElementById('loan-interest');
//     const yearsToPay = document.getElementById('years-to-pay');
    



//     submitBtn.addEventListener('click', (e)=>{

//         e.preventDefault();
//         resultSection.classList.add('d-none');
//         spinningLoader.classList.remove('d-none');

//         setTimeout(()=>{
//             // closing spinning loader
//             spinningLoader.classList.add('d-none');
//             // cleaning result values
//             monthlyPay.value = ``;
//             grossPayment.value = ``;
//             grossInterest.value = ``;

//             loanAmountInput.value = ``;
//             loanInterest.value = ``;
//             yearsToPay.value = ``;
            
//             // retrieving input fields ---->
//             loanAmountInput.disabled = false;
//             loanInterest.disabled = false;
//             yearsToPay.disabled = false;

//             //  resetting button 
//             submitBtn.setAttribute('type','submit');
//             submitBtn.id.replace('btn-reset','btn-submit');
//             submitBtn.value = `Calculate`;
//             submitBtn.classList.remove('bg-danger');
//             submitBtn.classList.add('bg-dark');

//         },4000)
        

//     })
// }

// resettingCalculator()







