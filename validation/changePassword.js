const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateChangePasswordInput(data) {
  let errors = {};

  data.oldpassword = !isEmpty(data.oldpassword) ? data.oldpassword : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (Validator.isEmpty(data.oldpassword)) {
    if (data.locale === 'fi')
      errors.oldpassword = messages.fi['changePassword.oldPassword'];
    else errors.oldpassword = messages.en['changePassword.oldPassword'];
  }

  var regex = RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$');

  if (!regex.test(data.password)) {
    if (data.locale === 'fi')
      errors.password = messages.fi['changePassword.passwordReg'];
    else errors.password = messages.en['changePassword.passwordReg'];
  }

  if (Validator.isEmpty(data.password)) {
    if (data.locale === 'fi')
      errors.password = messages.fi['changePassword.passwordRequired'];
    else errors.password = messages.en['changePassword.passwordRequired'];
  }

  if (!Validator.equals(data.password, data.password2)) {
    if (data.locale === 'fi')
      errors.password2 = messages.fi['changePassword.retypeMatch'];
    else errors.password2 = messages.en['changePassword.retypeMatch'];
  }

  if (Validator.isEmpty(data.password2)) {
    if (data.locale === 'fi')
      errors.password2 = messages.fi['changePassword.retypeRequired'];
    else errors.password2 = messages.en['changePassword.retypeRequired'];
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
