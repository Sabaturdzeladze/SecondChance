// Introducing libraries to the current file.
const Validator = require('validator');


// Exporting our validator function.
module.exports = function validateLoginInput(data) {

   // Setting up an empty object for catching any requirmenet violation.
   let errors = {};

   
   // Provided data. 
   // Setting it up to the provided data or to the Empty STRING < required syntax for a validator library. 
   data.email = data.email ? data.email : '';
   data.password = data.password ? data.password : '';
   
   // using methods provided from a validator library.
   // [...isEmail, isEmpty] = checking if the provided data matches our requirements.
   
   if (!Validator.isEmail(data.email)) { // data.email = "jondo@gmail.com".
      errors.email = 'Email is Invalid'; 
   };

   if (Validator.isEmpty(data.email)) {
      errors.email = 'Email field is required';
   };

   if (!Validator.isLength(data.password, { min: 6, max: 30 })) { // data.password = "1234567".
      errors.password = 'Password must be at least 6 characters';
   };

   if (Validator.isEmpty(data.password)) {
      errors.password = 'Password field is required';
   };


   let condition = Object.keys(errors).length === 0; // Object.keys returns array >>>  .length method is available now.
                                                      // So we can see if there was any requirment violation.
   return {
      errors,
      isValid: condition // In our case provided data did not violate given requirments.
   };
};