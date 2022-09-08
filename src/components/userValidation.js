const userValidation = (values, dateOfBirth) => {
    let errors = {};

    if(!values.firstName){
        errors.firstName="Please enter your first name";
    }
    if(!values.lastName){
        errors.lastName="Please enter your last name";
    }
    if(!values.email){
        errors.email="Please enter your email";
    }
    if(!values.phone){
        errors.phone="Please enter your phone number";
    }
    if(!values.password){
        errors.password="Please enter a password";
    }
    if(!values.confirmPassword){
        errors.confirmPassword="Please confirm your password";
    }
    if(values.confirmPassword !== values.password){
        errors.confirmPassword="Please confirm your password";
    }
    if(!dateOfBirth){
        errors.dateOfBirth="Please select your date of birth";
    }
    if(!values.regState){
        errors.regState="Please select the state you are located";
    }
    if(!values.gender){
        errors.gender="Please select your gender";
    }
    return errors;
}

export default userValidation;