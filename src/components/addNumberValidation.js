const addNumberValidation = (values) => {
    let errors = {};

    if(!values.agency){
        errors.agency="Please enter the agency name";
    }

    if(!values.phoneNumbers){
        errors.phoneNumbers="This field cannot be empty";
    }
    return errors;
}

export default addNumberValidation;