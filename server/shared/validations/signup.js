import validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function ValidateInput(data){
    let errors={};
    if(validator.isEmpty(data.username)){
        errors.username="required username";
    }
    if(validator.isEmpty(data.email)){
        errors.email="required email";
    }
    if(!validator.isEmail(data.email)){
        errors.email="invalid email";
    }

    if(validator.isEmpty(data.password)){
        errors.password="required password";
    }
    if(validator.isEmpty(data.passwordConfirmation)) {
        errors.passwordConfirmation = "required second password";
    }
    if(!validator.equals(data.password,data.passwordConfirmation)) {
        errors.timezone = "password must match";
    }
    if(validator.isEmpty(data.timezone)) {
        errors.timezone = "required timezone";
    }

    return {errors,isValid:isEmpty(errors)};
}
