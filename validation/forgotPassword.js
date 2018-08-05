const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateForgotPasswordInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';

  if (!Validator.isEmail(data.email)) {
    if (data.locale === 'fi')
      errors.email = messages.fi['forgotpassword.emailInvalid'];
    else errors.email = messages.en['forgotpassword.emailInvalid'];
  }
  if (Validator.isEmpty(data.email)) {
    if (data.locale === 'fi')
      errors.email = messages.fi['forgotpassword.emailRequired'];
    else errors.email = messages.en['forgotpassword.emailRequired'];
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
