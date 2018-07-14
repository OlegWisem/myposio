const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCompanyInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.field = !isEmpty(data.field) ? data.field : '';
  data.companyid = !isEmpty(data.companyid) ? data.companyid : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.description = !isEmpty(data.description) ? data.description : '';

  if (!Validator.isLength(data.name, { min: 2, max: 50 })) {
    errors.name = 'Name needs to be between 2 and 50 characters';
  }

  if (!Validator.isLength(data.field, { min: 2, max: 50 })) {
    errors.field = 'Company field needs to be between 2 and 50 characters';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Company name is required';
  }

  if (Validator.isEmpty(data.field)) {
    errors.field = 'Company field is required';
  }

  if (Validator.isEmpty(data.companyid)) {
    errors.companyid = 'Company ID is required';
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address field is required';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = 'Not a valid URL';
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
