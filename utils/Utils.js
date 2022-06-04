function isValidEmail(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

function isValidNumber(value){
        const re =/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    return re.test(value)
    
}

function validateEmail(value, setEmailError) {
    if (isValidEmail(value)) {
        setEmailError("")
    }
    else {
        setEmailError("Invalid Email")
    }
}

function validatePassword(value, setPasswordError) {
    if (value.length < 8) {
        setPasswordError("Password must be 8 characters")
    } else {
        setPasswordError("")
    }
}

function validateInput(value, minLength, setError) {
    if (value.length < minLength) {
        setError("Invalid Input")
    } else {
        setError("")
    }
}

  function onValidUsername(value){
    const re = /^[a-z0-9_.]+$/
    return re.test(value)
}
function validateUser(value, setError) {
    if (onValidUsername(value)) {
        setError("")
    }
    else {
        setError("Invalid Username")
    }
}

function calculateAngle(coordinates) {
    let startLat = coordinates[0]["latitude"]
    let startLng = coordinates[0]["longitude"]
    let endLat = coordinates[1]["latitude"]
    let endLng = coordinates[1]["longitude"]
    let dx = endLat - startLat
    let dy = endLng - startLng

    return Math.atan2(dy, dx) * 180 / Math.PI
}

const utils = {
    isValidEmail,
    validateEmail,
    validatePassword,
    validateInput,
    calculateAngle,
    validateUser
};

export default utils;