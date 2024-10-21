export const inputFocusHandler = (targetElement, spanElement, inputElement, spanColor) => {

    const containers = document.querySelectorAll(targetElement);
    [...containers].map(container=>{
        const span = container.querySelector(spanElement);
        const input = container.querySelector(inputElement);
        // input focus handle
        input.addEventListener('focus', ()=>{
            if (!input.value) {
                span.classList.add(spanColor);
            }
        });

        // Handle input blur (loses focus)
        input.addEventListener('blur', () => {
        if (!input.value) {
            span.classList.remove('text-orange-400');
            }
        });
    });
    
}

export const formClickHandler = (formElement, box, inputElement, spanElementIcon, color) => {

    const form = document.querySelector(formElement);
    form.addEventListener('click', ()=>{
        const containers = document.querySelectorAll(box);
        [...containers].map(container=>{
            const input = container.querySelector(inputElement);
            const span = container.querySelector(spanElementIcon);
    
            // if input is not focused 
            if (document.activeElement !== input) {
                if (!input.value) {
                    span.classList.remove(color);
                }
            }
    
        });
    });
    
}