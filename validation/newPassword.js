const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateNewPasswordInput(params, data) {
  let errors = {};

  params.email = !isEmpty(params.email) ? params.email : '';
  params.token = !isEmpty(params.token) ? params.token : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isEmail(params.email)) {
    if (data.locale === 'fi')
      errors.email = messages.fi['newPassword.emailInvalid'];
    else errors.email = messages.en['newPassword.emailInvalid'];
  }
  if (
    Object.keys(params.email).length === 0 ||
    Object.keys(params.token).length === 0
  ) {
    if (data.locale === 'fi')
      errors.email = messages.fi['newPassword.requestInvalid'];
    else errors.email = messages.en['newPassword.requestInvalid'];
  }

  var regex = RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$');

  if (!regex.test(data.password)) {
    if (data.locale === 'fi')
      errors.password = messages.fi['newPassword.passwordReg'];
    else errors.password = messages.en['newPassword.passwordReg'];
  }

  if (Validator.isEmpty(data.password)) {
    if (data.locale === 'fi')
      errors.password = messages.fi['newPassword.passwordRequired'];
    else errors.password = messages.en['newPassword.passwordRequired'];
  }

  if (!Validator.equals(data.password, data.password2)) {
    if (data.locale === 'fi')
      errors.password2 = messages.fi['newPassword.retypeMatch'];
    else errors.password2 = messages.en['newPassword.retypeMatch'];
  }

  if (Validator.isEmpty(data.password2)) {
    if (data.locale === 'fi')
      errors.password2 = messages.fi['newPassword.retypeRequired'];
    else errors.password2 = messages.en['newPassword.retypeRequired'];
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
