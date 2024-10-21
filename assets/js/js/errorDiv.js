export const errorFunction = (text) => {

    const createDiv = document.createElement('div');
    createDiv.className = `alert alert-danger d-flex align-items-center justify-content-between`;
    createDiv.id = 'error-notification';

    const createTextSpan = document.createElement('span');
    createTextSpan.id = 'error-text';
    createTextSpan.innerText =text || '';


    const createSpan = document.createElement('span');
    createSpan.id = 'error-icon';

    // Create the icon element manually
    const icon = document.createElement('i');
    icon.className = 'bi bi-x-lg fw-bold cursor-pointer';  // Add the Bootstrap and custom classes

    // Ensure the icon has the correct cursor style
    icon.style.cursor = 'pointer';

    // Append the icon to the span
    createSpan.appendChild(icon);

    // Append the text span and icon span to the div
    createDiv.append(createTextSpan, createSpan);

    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    card.insertBefore(createDiv, heading);
};