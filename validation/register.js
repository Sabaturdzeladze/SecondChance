// Introducing libraries to the current file.
const Validator = require("validator");

// // Exporting our validator function.
module.exports = function validateRegisterInput(data) {
  // Setting up an empty object for catching any requirmenet violation.
  let errors = {};

  // Provided data.
  // Setting up the provided data or to the Empty STRING < required syntax for a validator library.
  data.username = data.username ? data.username : "";
  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";
  data.password2 = data.password2 ? data.password2 : "";
  data.birthday = data.birthday ? data.birthday : "";
  data.balance = data.balance ? data.balance : "";

  // using methods provided from a validator library.
  // [...isLength, isEmpty] = checking if the provided data matches our requirements.

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) { // data.username = jondo
    errors.username = "Username must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.username)) { 
    errors.username = "Username field is required";
  }

  if (Validator.isEmpty(data.email)) { // data.email = jondo@gmail.com
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) { // data.password = incrediblehulk
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) { //  data.password2 = incrediblehulk
    errors.password2 = "Confirm Password field is required"; 
  }

  if (!Validator.equals(data.password2, data.password)) { 
    errors.password2 = "Passwords must match";
  }

  let condition = Object.keys(errors).length === 0; // Object.keys returns array >>>  .length method is available now.
                                                      // So we can see if there was any requirment violation.

  return {
    errors,
    isValid: condition   // In our case provided data did not violate given requirements.
  };
};
