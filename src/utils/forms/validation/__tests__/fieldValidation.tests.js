import moment from 'moment';
import {
  numbers,
  password,
  confirmPassword,
  maxLength,
  minLength,
  multiCheckbox,
  cvc,
  website,
  required,
  email,
  card,
  lozengeSelect,
  tags,
  exists,
  datePeriodTwoWeeks
} from '../fieldValidation';

it('should validate number', () => {
  expect(numbers('ssdsdsd')).toEqual('Please only use numbers and/or "+"');
  expect(numbers('dfdf333222')).toEqual('Please only use numbers and/or "+"');
  expect(numbers('122222')).toEqual(undefined);
});

it('should validate password', () => {
  expect(password('asd')).toEqual('This needs to be 8 to 30 characters long and must have at least 1 number and 1 letter');

  expect(password('asd$#(*&$##)(*$#$(*#!!_#fsld))'))
  .toEqual('This needs to be 8 to 30 characters long and must have at least 1 number and 1 letter');

  expect(password('$#(*&$##)(*$#$(*#!!_#123456567890))'))
  .toEqual('This needs to be 8 to 30 characters long and must have at least 1 number and 1 letter');

  expect(password('')).toEqual('This needs to be 8 to 30 characters long and must have at least 1 number and 1 letter');
});

it('should validate confirmPassword', () => {
  expect(confirmPassword('')).toEqual('This needs to match the new password');
  expect(confirmPassword('newPassw0rd1')).toBeFalsy();
});

it('should validate maxLength', () => {
  expect(maxLength('Email', 15)('sdsdsklfjdlkdsjfdkl')).toEqual('Email must be no more than 15 characters');
  expect(maxLength('Email')('sdsdsklfjdlkdsjfdklsdsdsklfjdlkdsjfdklsdsdsklfjdlkdsjfdklsdsdsklfjdlkdsjfdklsdsdsklfjdlkdsjfdkl'))
  .toEqual('Email must be no more than 64 characters');
  expect(maxLength('Email', 15)('sdsdsklfjdlk')).toEqual(undefined);
});

it('should validate minLength', () => {
  expect(minLength('Email', 15)('sdsdsklfjdlk')).toEqual('Email must be no less than 15 characters');
  expect(minLength('Email')('dfdfdf')).toEqual('Email must be no less than 9 characters');
  expect(minLength('Email', 15)('sdsdskfdsfsdfdsflfjdlk')).toEqual(undefined);
});

it('should validate multiCheckbox', () => {
  expect(multiCheckbox('Sidekick')([])).toEqual('At least one Sidekick must be selected');
  expect(multiCheckbox('Sidekick')(['sdsdsd'])).toEqual(undefined);
});

it('should validate cvc field', () => {
  expect(cvc(3)('1111')).toEqual('This needs to be 3 numbers in length');
  expect(cvc(3)('111')).toEqual(undefined);
});

it('should validate invalid website address', () => {
  expect(website('google')).toEqual('This needs to be a valid website address');
  expect(website('www.google.')).toEqual('This needs to be a valid website address');
  expect(website('//www.google.com')).toEqual('This needs to be a valid website address');
  expect(website('google.com')).toBeUndefined();
  expect(website('http://www.google.com')).toBeUndefined();
});

it('should validate required field', () => {
  expect(required('Email')('')).toEqual('Email is required');
  expect(required('Email')('sdsdsd')).toEqual(undefined);
});

it('should validate email field', () => {
  expect(email('sdsdsdsdfkdsjfkosdfjlsjfsldkf@sdfksjdfsdsdsdsdsdsdsdsdsdlksdj')).toEqual('Not a valid email address');
  expect(email('sdsd@sdsd')).toEqual('Not a valid email address');
  expect(email('nikola@gmail.')).toEqual('Not a valid email address');
  expect(email('nikola@gmail.com')).toEqual(undefined);
});

it('should validate card field', () => {
  expect(card('4444444444444444')).toEqual('This needs to be a valid credit card number');
  expect(card('')).toEqual('This needs to be a valid credit card number');
  expect(card('112345678901234567890123456789012345678901234567890123456789012345')).toEqual('This needs to be a valid credit card number');
  expect(card('4242 4242 4242 4242')).toEqual(undefined);
});

it('should validate lozengeSelect field', () => {
  expect(lozengeSelect('Sidekick')([])).toEqual('At least one Sidekick must be selected');
  expect(lozengeSelect('Sidekick')(['sdsdsd'])).toEqual(undefined);
});

it('should validate tags field', () => {
  expect(tags('email')([])).toEqual('At least one email must be added');
  expect(tags('email', 10)(['ssdsdsd@sdsdsdsd.com'])).toEqual('Email must be no more than 10 characters');
  expect(tags('email', 15)(['ssdsd@sdsd'])).toEqual('ssdsd@sdsd is not a valid email address');
  expect(tags('email', 15)(['ssdsd@sdsd', 'fff@dddd'])).toEqual('ssdsd@sdsd, fff@dddd are not valid email addresses');
  expect(tags('email', 15)(['ssdsd@sdsd.com', 'ssdsd@sdsd.com'])).toEqual('Please remove the duplicate email address: ssdsd@sdsd.com');
  expect(tags('email', 15)(['ssdsd@sdsd.com', 'ssdsd@sdsd.com', 'bob@bob.com', 'bob@bob.com']))
  .toEqual('Please remove the duplicate email addresses: bob@bob.com, ssdsd@sdsd.com');
});

it('should validate exists field', () => {
  expect(exists('')).toEqual('This is required');
});

it('should validate the date period', () => {
  expect(datePeriodTwoWeeks({
    jobPayPeriod: {
      from: moment('2017-07-01T15:00:00+10:00'),
      to: moment('2017-07-25T15:00:00+10:00')
    }
  })).toEqual({ jobPayPeriod: 'Please specify a pay period that is 2 weeks or less' });

  expect(datePeriodTwoWeeks({
    jobPayPeriod: {
      from: moment('2017-07-01T15:00:00+10:00'),
      to: moment('2017-07-14T15:00:00+10:00')
    }
  })).toEqual({});

});
