const Validator = require('validator');
const isEmpty = require('./is-empty');
const messages = require('../lang/messages');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    if (data.locale === 'fi') errors.email = messages.fi['login.emailInvalid'];
    else errors.email = messages.en['login.emailInvalid'];
  }
  if (Validator.isEmpty(data.email)) {
    if (data.locale === 'fi') errors.email = messages.fi['login.emailRequired'];
    else errors.email = messages.en['login.emailRequired'];
  }
  if (Validator.isEmpty(data.password)) {
    if (data.locale === 'fi') errors.password = messages.fi['login.password'];
    else errors.password = messages.en['login.password'];
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
