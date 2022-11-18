export const passwordReg = new RegExp('^.{8,25}$');
export const emailReg = new RegExp(
  '^([\\w\\.\\+\\-]+\\@[a-zA-Z0-9\\.\\-]+\\.[a-zA-z0-9]{2,4})$',
);
export const mobileReg = new RegExp('^(\\+\\d{2}[ ])?\\d{10}$');
export const nameReg = new RegExp('^[a-zA-Z ]+$');
export const numberReg = new RegExp('^[\\d]+$');
export const alphaNumericReg = new RegExp('^([a-zA-Z0-9 ]){3,15}$');
export const panReg = new RegExp('[A-Za-z]{5}\\d{4}[A-Za-z]{1}');
