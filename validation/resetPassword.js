const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateResetPasswordInput(params) {
  let errors = {};

  params.email = !isEmpty(params.email) ? params.email : '';
  params.token = !isEmpty(params.token) ? params.token : '';
  params.lang = !isEmpty(params.lang) ? params.lang : '';

  if (!Validator.isEmail(params.email)) {
    if (data.lang === 'fi')
      errors.email = messages.fi['resetPassword.emailInvalid'];
    else errors.email = messages.en['resetPassword.emailInvalid'];
  }
  if (
    Object.keys(params.email).length === 0 ||
    Object.keys(params.token).length === 0
  ) {
    if (data.lang === 'fi')
      errors.email = messages.fi['resetPassword.requestInvalid'];
    else errors.email = messages.en['resetPassword.requestInvalid'];
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
