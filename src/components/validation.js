

const validation = (values) => {
    let errors = {};
    if(!values.question1){
        errors.question1="Please select question 1";
    }
    if(!values.answer1){
        errors.answer1="Please enter answer 1";
    }

    if(!values.question2){
        errors.question2="Please select question 2";
    }
    if(!values.answer2){
        errors.answer2="Please enter answer 2";
    }

    if(!values.question3){
        errors.question3="Please select question 3";
    }
    if(!values.answer3){
        errors.answer3="Please enter answer 3";
    }
  return errors;
}

export default validation