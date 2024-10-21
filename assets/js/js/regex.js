
export const numberRegex = (value, name) => {

    const numberReg = new RegExp("^-?\d+(\.\d+)?$");
    const trimmedValue = value.trim();

    // if value is an empty string 

    if (trimmedValue==='') {
        return{
            isValid : false,
            error: `ERROR: ${name} amount section can't be an empty! `
        }
    }
    // if value is not a number 
    if (!numberReg.test(trimmedValue)) {
        return {
            isValid: false,
            error: `ERROR: ${name} amount can't be other than numbers.`
        }
    }
    if (trimmedValue===0) {
        
        return {
            isValid: false,
            error: `ERROR: ${name} value is invalid!`
        }
    }
    if (trimmedValue<0) {
        return {
            isValid: false,
            error: `ERROR: ${name} is invalid !`
        }
    }

    return{
        isValid: true,
        error: null
    }

}