const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    if (data.locale === 'fi') errors.name = messages.fi['profile.nameLength'];
    else errors.name = messages.en['profile.nameLength'];
  }

  if (Validator.isEmpty(data.name)) {
    if (data.locale === 'fi') errors.name = messages.fi['profile.nameRequired'];
    else errors.name = messages.en['profile.nameRequired'];
  }

  if (!Validator.isEmail(data.email)) {
    if (data.locale === 'fi')
      errors.email = messages.fi['profile.emailInvalid'];
    else errors.email = messages.en['profile.emailInvalid'];
  }

  if (Validator.isEmpty(data.email)) {
    if (data.locale === 'fi')
      errors.email = messages.fi['profile.emailRequired'];
    else errors.email = messages.en['profile.emailRequired'];
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
