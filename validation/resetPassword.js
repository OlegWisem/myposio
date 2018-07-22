const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateResetPasswordInput(params) {
  let errors = {};

  params.email = !isEmpty(params.email) ? params.email : '';
  params.token = !isEmpty(params.token) ? params.token : '';

  if (!Validator.isEmail(params.email)) {
    errors.email = 'Email is invalid';
  }
  if (
    Object.keys(params.email).length === 0 ||
    Object.keys(params.token).length === 0
  ) {
    errors.email = 'Invalid request';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
