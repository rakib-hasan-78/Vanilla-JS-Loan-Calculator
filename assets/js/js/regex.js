export const numberRegex = (value, name) => {
    const numberReg = new RegExp("^-?\\d*\\.?\\d+$");

    const trimmedValue = value.trim(); // Trim value first

    if (trimmedValue === '') {
        return {
            isValid: false,
            error: `ERROR: ${name} section can't be empty!`
        };
    }

    if (!numberReg.test(trimmedValue)) {
        return {
            isValid: false,
            error: `ERROR: ${name} can't be other than numbers.`
        };
    }

    const numValue = Number(trimmedValue);
    if (numValue === 0 || numValue < 0) {
        return {
            isValid: false,
            error: `ERROR: ${name} value is invalid!`
        };
    }

    return {
        isValid: true,
        error: null
    };
};
