const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    if (data.locale === 'fi') errors.name = messages.fi['register.nameLength'];
    else errors.name = messages.en['register.nameLength'];
  }

  if (Validator.isEmpty(data.name)) {
    if (data.locale === 'fi')
      errors.name = messages.fi['register.nameRequired'];
    else errors.name = messages.en['register.nameRequired'];
  }

  if (!Validator.isEmail(data.email)) {
    if (data.locale === 'fi')
      errors.email = messages.fi['register.emailInvalid'];
    else errors.email = messages.en['register.emailInvalid'];
  }

  if (Validator.isEmpty(data.email)) {
    if (data.locale === 'fi')
      errors.email = messages.fi['register.emailRequired'];
    else errors.email = messages.en['register.emailRequired'];
  }

  var regex = RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$');

  if (!regex.test(data.password)) {
    if (data.locale === 'fi')
      errors.password = messages.fi['register.passwordReg'];
    else errors.password = messages.en['register.passwordReg'];
  }

  if (Validator.isEmpty(data.password)) {
    if (data.locale === 'fi')
      errors.password = messages.fi['register.passwordRequired'];
    else errors.password = messages.en['register.passwordRequired'];
  }

  if (!Validator.equals(data.password, data.password2)) {
    if (data.locale === 'fi')
      errors.password2 = messages.fi['register.retypeMatch'];
    else errors.password2 = messages.en['register.retypeMatch'];
  }

  if (Validator.isEmpty(data.password2)) {
    if (data.locale === 'fi')
      errors.password2 = messages.fi['register.retypeRequired'];
    else errors.password2 = messages.en['register.retypeRequired'];
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
