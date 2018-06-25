import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import matches from 'validator/lib/matches';
import isCreditCard from 'validator/lib/isCreditCard';
import isURL from 'validator/lib/isURL';
import isNumeric from 'validator/lib/isNumeric';

export const password = (value) => {
  const passwordInstructions = 'to be 8 to 30 characters long and must have at least 1 number and 1 letter';

  if (typeof value !== 'string' ||
    (value.length > 30) ||
    (value.length < 8) ||
    !matches(value, /[0-9]/i) ||
    !matches(value, /[a-z]/i)) {
    return `This needs ${passwordInstructions}`;
  }

  return undefined;
};

export const confirmPassword = (value) => {
  if (typeof value !== 'string' ||
    isEmpty(value.trim()) ||
    (password(value) && value.trim() !== password(value).trim())) {
    return 'This needs to match the new password';
  }

  return undefined;
};

export const maxLength = (field, length) => (value) => {
  const max = length || 64;

  if (value && value.trim().length > max) {
    return `${field} must be no more than ${max} characters`;
  }

  return undefined;
};

export const minLength = (field, length) => (value) => {
  const min = length || 9;

  if (value && value.trim().length < min) {
    return `${field} must be no less than ${min} characters`;
  }

  return undefined;
};

export const multiCheckbox = field => (values) => {
  const updatedValues = values && values.map(i => i.value);

  if (updatedValues && updatedValues.every(x => x === false)) {
    return `At least one ${field} must be selected`;
  }

  return undefined;
};

export const cvc = length => (value) => {
  if (value &&
    ((value.length > length) ||
    (value.length < length) ||
    !(/^[0-9]*$/).test(value.trim()))) {
    return `This needs to be ${length} numbers in length`;
  }

  return undefined;
};

export const website = (value) => {
  if (value && !isURL(value, {
    protocols: ['http', 'https'],
    require_tld: true,
    require_protocol: false,
    require_host: true,
    require_valid_protocol: false,
    allow_underscores: false,
    host_whitelist: false,
    host_blacklist: false,
    allow_trailing_dot: false,
    allow_protocol_relative_urls: false
  })) {
    return 'This needs to be a valid website address';
  }

  return undefined;
};

export const tags = (field, length) => (values) => {
  let errors;
  const sortedTags = values && values.slice().sort();
  const duplicateTags = [];
  const tagList = [];
  const max = length || 64;

  if (!Array.isArray(values) || values.length <= 0) {
    errors = `At least one ${field} must be added`;
  }

  values && values.map((value, index) => {

    if (value.trim().length > max) {
      errors = `${field.charAt(0).toUpperCase() + field.slice(1)} must be no more than ${max} characters`;
    }

    else if (!isEmail(value)) {
      tagList.push(value);

      if (tagList.length > 1) {
        errors = `${tagList.join(', ')} are not valid ${field} addresses`;
      }
      else {
        errors = `${tagList} is not a valid ${field} address`;
      }
    }

    else if (sortedTags[index + 1] === sortedTags[index]) {
      duplicateTags.push(sortedTags[index]);

      if (duplicateTags.length) {
        const address = duplicateTags.length > 1 ? 'addresses' : 'address';
        errors = `Please remove the duplicate ${field} ${address}: ${duplicateTags.join(', ')}`;
      }
    }

    return undefined;

  });

  return errors;
};

// Check if the period between 2 dates is less than 2 weeks
export const datePeriodTwoWeeks = (value) => {
  const errors = {};

  if (value.jobPayPeriod) {
    // Check if period is more than 14 days
    if (value.jobPayPeriod.to.diff(value.jobPayPeriod.from, 'weeks') >= 2) {
      errors.jobPayPeriod = 'Please specify a pay period that is 2 weeks or less';
    }
  }

  return errors;
};

export const exists = value => (!value ? 'This is required' : undefined);

export const required = field => value => (typeof value !== 'string' || isEmpty(value.trim()) ? `${field} is required` : undefined);

export const email = value => (value && !isEmail(value) ? 'Not a valid email address' : undefined);

export const numbers = value => (value && !isNumeric(value) ? 'Please only use numbers and/or "+"' : undefined);

export const lozengeSelect = field => values => (values && (!Array.isArray(values) || values.length <= 0) ?
  `At least one ${field} must be selected` : undefined);

export const card = value => ((!isCreditCard(value) || !value.replace(/\s/g, '').length) ? 'This needs to be a valid credit card number' : undefined);
