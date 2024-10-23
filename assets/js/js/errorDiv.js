
export const errorFunction = (displayActive, displayInActive, text) => {
    let errorDiv = document.getElementById('error-notification');

    // Check if the error div already exists
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = `alert alert-danger align-items-center justify-content-between`;
        errorDiv.id = 'error-notification';

        const createTextSpan = document.createElement('span');
        createTextSpan.id = 'error-text';
        createTextSpan.innerText = text || '';
        errorDiv.appendChild(createTextSpan);

        const createSpan = document.createElement('span');
        createSpan.id = 'error-icon';

        // Create the icon element manually
        const icon = document.createElement('i');
        icon.className = 'bi bi-x-lg fw-bold cursor-pointer';  // Add the Bootstrap and custom classes

        // Ensure the icon has the correct cursor style
        icon.style.cursor = 'pointer';

        // Append the icon to the span
        createSpan.appendChild(icon);
        errorDiv.appendChild(createSpan);

        const card = document.querySelector('.card');
        const heading = document.querySelector('.heading');
        card.insertBefore(errorDiv, heading);

        // Add click event to the icon to close the error notification
        icon.addEventListener('click', () => {
            errorDiv.classList.remove('d-flex');
            errorDiv.classList.add('d-none');
            document.getElementById('error-text').innerText = '';
        });
    }

    // Update the error message and visibility
    const errorTextSpan = document.getElementById('error-text');
    errorTextSpan.innerText = text || '';

    // Toggle the display classes based on the validation result
    errorDiv.classList.remove(displayInActive);
    errorDiv.classList.add(displayActive);
};

