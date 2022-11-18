import * as validate from './Validator';
import { findKey } from 'lodash';

export function handleRequired(validationData) {
  let error = { isError: false };

  Object.keys(validationData).map((value, key) => {
    //let value = this[`${type}Ref`].value(),
    let isEmpty = validate._isEmpty(validationData[value].value),
      typeMatch = {};
    if (!isEmpty) {
      //Add more cases depending upon the types that need to be checked
      switch (validationData[value].type) {
        case 'email':
          typeMatch['hasPassed'] = validate._isValidEmail(
            validationData[value].value,
          );
          !typeMatch['hasPassed']
            ? (error[`${value}Error`] =
                'Please enter Valid Email eg. (abc@abc.com)')
            : null;
          break;
        case 'mobile':
          typeMatch['hasPassed'] = validate._isValidMobile(
            validationData[value].value,
          );
          !typeMatch['hasPassed']
            ? (error[`${value}Error`] =
                'Please enter Valid Mobile no (Do not inclue +91)')
            : null;
          break;
        case 'password':
          typeMatch['hasPassed'] = validate._isValidPassword(
            validationData[value].value,
          );
          !typeMatch['hasPassed']
            ? (error[`${value}Error`] = 'Password should have min 8 characters')
            : null;
          break;
        case 'pan':
          typeMatch['hasPassed'] = validate._isValidPan(
            validationData[value].value,
          );
          !typeMatch['hasPassed']
            ? (error[`${value}Error`] = 'Enter valid pan number')
            : null;
          break;
        case 'alphaNumeric':
          typeMatch['hasPassed'] = validate._isValidAlphaNumeric(
            validationData[value].value,
          );
          !typeMatch['hasPassed']
            ? (error[`${value}Error`] =
                '3 to 15 alphaNumeric characters required  ')
            : null;
          break;
        case 'confirmPassword':
          //const password  = findKey(validationData, { type: 'password' });
          const password = validationData[value].compareValue;
          typeMatch['hasPassed'] = validate._isMatching(
            password,
            validationData[value].value,
          );
          !typeMatch['hasPassed']
            ? (error[`${value}Error`] =
                'Password & Confirm password do not match')
            : null;
          break;
        case 'string':
          typeMatch['hasPassed'] = validate._isValidName(
            validationData[value].value,
          );
          !typeMatch['hasPassed']
            ? (error[`${value}Error`] = 'Invalid format')
            : null;
          break;
        case 'number':
          typeMatch['hasPassed'] = validate._isValidNumber(
            validationData[value].value,
          );
          !typeMatch['hasPassed']
            ? (error[`${value}Error`] = 'Invalid format')
            : null;
          break;
      }
    } else {
      error[`${value}Error`] = 'Please provide the necessary details';
    }
  });
  Object.keys(error).length > 1 ? (error['isError'] = true) : null;
  return error;
}
