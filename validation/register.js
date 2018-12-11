const Validator = require("validator");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // setting to empty string because of the syntax of validator
  // it must have empty string to validate properties
  data.username = data.username ? data.username : "";
  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";
  data.password2 = data.password2 ? data.password2 : "";
  data.birthday = data.birthday ? data.birthday : "";
  data.balance = data.balance ? data.balance : "";

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "Username must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email field is invalid";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password2, data.password)) {
    errors.password2 = "Passwords must match";
  }

  let condition = Object.keys(errors).length === 0;

  return {
    errors,
    isValid: condition
  };
};
