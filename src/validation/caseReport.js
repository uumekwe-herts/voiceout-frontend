const caseReportValidation = (values, dateOfIncident) => {
    let errors = {};
    if(!values.reportingFor){
        errors.reportingFor="Please select who you are reporting for";
    }
    if(!values.contactPhone){
        errors.contactPhone="Please enter your phone number";
    }
    if(!values.contactFirstName){
        errors.contactFirstName="Please enter contact first name";
    }
    if(!values.contactLastName){
        errors.contactLastName="Please enter contact last name";
    }
    if(!values.contactEmail){
        errors.contactEmail="Please enter contact email";
    }
    if(!values.age){
        errors.age="Please enter your age";
    }
    if(!values.category){
        errors.category="Please select a category";
    }
    if(!dateOfIncident){
        errors.dateOfIncident="Please select the date of the incident";
    }
    if(!values.caseInformation){
        errors.caseInformation="Please give us more information about the incident";
    }
    if(!values.incidentAddress){
        errors.incidentAddress="Please give us the full address where the incident occurred";
    }
    if(!values.numberOfVictims){
        errors.numberOfVictims="Please give us the number of victims in the incident";
    }
    if(!values.numberOfVictims){
        errors.numberOfViolators="Please give us the number of violators in the incident";
    }
return errors;
}

export default caseReportValidation 