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
    let valid;
    
    // validation logic 
    
    if (loanAmountInput.id==='amount') {
        ({isValid, error}= numberRegex(loanAmountInput.value.trim(), 'Amount'));
        if (!isValid) throw new CustomError(error);
    }
    if (loanInterest.id ==='loan-interest') {
        ({isValid, error}=numberRegex(loanInterest.value.trim(), 'Interest') )
        if (!isValid) throw new CustomError(error);
    }
    if (yearsToPay.id==='years-to-pay'){
        ({isValid, error} = numberRegex(yearsToPay.value.trim(), 'Year'))
        if (!isValid) throw new CustomError(error);
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
        let totalPayment = (parseFloat(expectedAmount )+  parseFloat(interestAmount)).toFixed(2);
        let paybackPerMonth = (totalPayment/(loanYears * 12)).toFixed(2);
        
        spinningLoader.classList.remove('d-none');

        setTimeout(()=>  {
            spinningLoader.classList.add('d-none');
            resultSection.classList.remove('d-none');

            monthlyPay.value = `${paybackPerMonth}`;
            grossPayment.value = `${totalPayment}`;
            grossInterest.value = `${interestAmount}`;

            // Disable inputs and switch button to Reset
            loanAmountInput.disabled = true;
            loanInterest.disabled = true;
            yearsToPay.disabled = true;

            submitBtn.setAttribute('type', 'button');
            submitBtn.id = 'btn-reset';  // Properly change ID
            submitBtn.value = 'Reset';
            submitBtn.classList.remove('bg-dark');
            submitBtn.classList.add('bg-danger');
        }, 1000);

    }

});



// Resetting calculator
const resettingCalculator = () => {
    const submitBtn = document.getElementById('btn-submit');
    
    submitBtn.addEventListener('click', (e) => {
        if (submitBtn.id === 'btn-reset') {  // Only reset if it's in reset mode
            e.preventDefault();

            const spinningLoader = document.getElementById('loading');
            const resultSection = document.getElementById('result');
            const monthlyPay = document.getElementById('monthly-payment');
            const grossPayment = document.getElementById('gross-payment');
            const grossInterest = document.getElementById('gross-interest');

            const loanAmountInput = document.getElementById('amount');
            const loanInterest = document.getElementById('loan-interest');
            const yearsToPay = document.getElementById('years-to-pay');

            resultSection.classList.add('d-none');
            spinningLoader.classList.remove('d-none');

            setTimeout(() => {
                spinningLoader.classList.add('d-none');
                
                // Reset all values
                monthlyPay.value = '';
                grossPayment.value = '';
                grossInterest.value = '';

                loanAmountInput.value = '';
                loanInterest.value = '';
                yearsToPay.value = '';

                loanAmountInput.disabled = false;
                loanInterest.disabled = false;
                yearsToPay.disabled = false;

                // Reset button back to Calculate
                submitBtn.setAttribute('type', 'submit');
                submitBtn.id = 'btn-submit';  // Reset ID
                submitBtn.value = 'Calculate';
                submitBtn.classList.remove('bg-danger');
                submitBtn.classList.add('bg-dark');
                // resetting form field style 
                loanAmountInput.classList.remove('is-valid','is-invalid');
                loanInterest.classList.remove('is-valid','is-invalid');
                yearsToPay.classList.remove('is-valid','is-invalid');
                const spanChange = document.querySelectorAll('span i');
                spanChange.forEach(value=>(value.classList.remove('text-success')))
            }, 1000);
        }
    });
};

resettingCalculator();







