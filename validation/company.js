const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateCompanyInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.field = !isEmpty(data.field) ? data.field : '';
  data.companyid = !isEmpty(data.companyid) ? data.companyid : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.category = !isEmpty(data.category) ? data.category : '';

  if (!Validator.isLength(data.name, { min: 2, max: 50 })) {
    if (data.locale === 'fi') errors.name = messages.fi['company.nameLength'];
    else errors.name = messages.en['company.nameLength'];
  }

  if (Validator.isEmpty(data.name)) {
    if (data.locale === 'fi') errors.name = messages.fi['company.nameRequired'];
    else errors.name = messages.en['company.nameRequired'];
  }

  if (Validator.isEmpty(data.category)) {
    if (data.locale === 'fi')
      errors.category = messages.fi['company.categoryRequired'];
    else errors.category = messages.en['company.categoryRequired'];
  }

  if (data.category === '0') {
    if (data.locale === 'fi')
      errors.category = messages.fi['company.categoryRequired'];
    else errors.category = messages.en['company.categoryRequired'];
  }

  if (!Validator.isLength(data.field, { min: 2, max: 50 })) {
    if (data.locale === 'fi') errors.field = messages.fi['company.fieldLength'];
    else errors.field = messages.en['company.fieldLength'];
  }

  if (Validator.isEmpty(data.field)) {
    if (data.locale === 'fi')
      errors.field = messages.fi['company.fieldRequired'];
    else errors.field = messages.en['company.fieldRequired'];
  }

  if (Validator.isEmpty(data.address)) {
    if (data.locale === 'fi')
      errors.address = messages.fi['company.addressRequired'];
    else errors.address = messages.en['company.addressRequired'];
  }

  if (Validator.isEmpty(data.description)) {
    if (data.locale === 'fi')
      errors.description = messages.fi['company.descriptionRequired'];
    else errors.description = messages.en['company.descriptionRequired'];
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      if (data.locale === 'fi')
        errors.website = messages.fi['company.websiteValid'];
      else errors.website = messages.en['company.websiteValid'];
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      if (data.locale === 'fi')
        errors.youtube = messages.fi['company.youtubeValid'];
      else errors.youtube = messages.en['company.youtubeValid'];
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      if (data.locale === 'fi')
        errors.twitter = messages.fi['company.twitterValid'];
      else errors.twitter = messages.en['company.twitterValid'];
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      if (data.locale === 'fi')
        errors.facebook = messages.fi['company.facebookValid'];
      else errors.facebook = messages.en['company.facebookValid'];
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      if (data.locale === 'fi')
        errors.instagram = messages.fi['company.instagramValid'];
      else errors.instagram = messages.en['company.instagramValid'];
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
