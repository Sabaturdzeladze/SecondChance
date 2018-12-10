const Validator = require('validator');

module.exports = function validateLoginInput(data) {
   let errors = {};

   data.email = data.email ? data.email : '';
   data.password = data.password ? data.password : '';

   if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is Invalid';
   };

   if (Validator.isEmpty(data.email)) {
      errors.email = 'Email field is required';
   };

   if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
      errors.password = 'Password must be at least 6 characters';
   };

   if (Validator.isEmpty(data.password)) {
      errors.password = 'Password field is required';
   };

   let condition = Object.keys(errors).length === 0;

   return {
      errors,
      isValid: condition
   };
};