import {
  passwordReg,
  emailReg,
  mobileReg,
  nameReg,
  numberReg,
  alphaNumericReg,
  panReg,
} from './ValidationRegex';

//Keep below functions pure, that is, output should be a predictable state (truthy or false). Invocations of the below functions should be in `ValidationHandler`
export function _isEmpty(value) {
  if (value && typeof value == 'string' && value.trim()) return false;
  else return true;
}

export function _isValidPassword(value) {
  return passwordReg.test(value.trim());
}

export function _isValidEmail(value) {
  return emailReg.test(value.trim());
}

export function _isValidMobile(value) {
  return mobileReg.test(value.trim());
}

export function _isValidNumber(value) {
  return numberReg.test(value.trim());
}

export function _isValidAlphaNumeric(value) {
  return alphaNumericReg.test(value.trim());
}

export function _isValidPan(value) {
  return panReg.test(value.trim());
}

export function _isMatching(val1, val2) {
  //return type should be boolean
  if (
    val1 &&
    val2 &&
    typeof val1 == 'string' &&
    typeof val2 == 'string' &&
    val1.trim() == val2.trim()
  )
    return true;
  else return false;
}

export function _isValidName(value) {
  return nameReg.test(value.trim());
}
