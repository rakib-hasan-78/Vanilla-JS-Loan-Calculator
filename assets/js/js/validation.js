
import { CustomError } from './customError.js';
import { errorFunction } from './errorDiv.js';
import { numberRegex } from './regex.js';


export const inputValidationHandlers = (targetElement, spanElement, inputElement) => {
    const containers = document.querySelectorAll(targetElement);
    [...containers].map(container=>{
        const span = container.querySelector(spanElement);
        const input = container.querySelector(inputElement);
        // input focus handle
        input.addEventListener('input', (e)=>{
            try {
                let validation;
                if (e.target.id==='amount') {
                    validation = numberRegex(e.target.value, 'Amount');
                }
                if (e.target.id==='loan-interest') {
                    validation = numberRegex(e.target.value, 'Interest');
                }
                if (e.target.id=== 'years-to-pay') {
                    validation = numberRegex(e.target.value, 'Year')
                }
                const {isValid , error} = validation;

                if (isValid) {

                    span.classList.remove('text-orange-400', 'text-danger');
                    span.classList.add('text-success');

                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');

                    // errorFunction('d-none', 'd-flex', '');


                } else if (e.target.value==='') {

                    span.classList.remove('text-orange-400','text-success');
                    span.classList.add('text-danger');

                    input.classList.remove('is-valid');
                    input.classList.add('is-invalid');

                    // errorFunction('d-flex', 'd-none', '');

                    throw new CustomError(error);

                }
                 else {

                    span.classList.remove('text-orange-400','text-success');
                    span.classList.add('text-danger');

                    input.classList.remove('is-valid');
                    input.classList.add('is-invalid');

                    // errorFunction('d-flex', 'd-none', '');

                    throw new CustomError(error);
                }
            } catch (error) {
                errorFunction('d-flex', 'd-none', `${error.message}`);         
            }
        });

    });
}