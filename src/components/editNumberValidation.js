const editNumberValidation = (agency, agencyPhone) => {
    let errors = {};

    if(!agency){
        errors.agency="Please enter the agency name";
    }

    if(!agencyPhone){
        errors.agencyPhone="This field cannot be empty";
    }
    return errors;
}

export default editNumberValidation;