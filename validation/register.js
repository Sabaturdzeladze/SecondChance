const Validator = require('validator');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // setting to empty string because of the syntax of validator
  // it must have empty string to validate properties
  data.name = data.name ? data.name : '';     
  data.lastname = data.lastname ? data.lastname : '';     
  data.email = data.email ? data.email : '';
  data.password = data.password ? data.password : '';
  data.password2 = data.password2 ? data.password2 : '';
  data.country = data.country ? data.country : '';
  data.address = data.address ? data.address : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
     errors.name = 'Name must be between 2 and 30 characters';
  };

  if (Validator.isEmpty(data.name)) {
     errors.name = 'Name field is required';
  };

  if (!Validator.isLength(data.lastname, { min: 3, max: 30 })) {
     errors.lastname = 'Lastname must be between 3 and 30 characters';
  };

  if (Validator.isEmpty(data.name)) {
     errors.lastname = 'Lastname field is required';
  };

  if (Validator.isEmpty(data.email)) {
     errors.email = 'email field is required';
  };

  if (!Validator.isEmail(data.email)) {
     errors.email = 'password  field is required';
  };

  if (Validator.isEmpty(data.password)) {
     errors.password = 'Password field is required';
  };

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
     errors.password = 'Password must be at least 6 characters';
  };

  if (Validator.isEmpty(data.password2)) {
     errors.password2 = 'Confirm Password field is required';
  };

  if (!Validator.equals(data.password2, data.password)) {
     errors.password2 = 'Passwords must match';
  };

  if (Validator.isEmpty(data.country)) {
    errors.country = 'Country field is required';
 };

  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address field is required';
 };

 let condition = Object.keys(errors).length === 0;
  return {
     errors,
     isValid: condition
  };
};