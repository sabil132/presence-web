export const validatorPositive = (value) => {
  return value >= 0
}

export const validatorPasswordSame = (value, [target], ctx) => {
  return value === target;
}

export const validatorPasswordLength = (value) => {
  const passwordLength = value.split('').length;
  return !!(passwordLength >= 8 && passwordLength <= 12);
}

export const validatorPasswordLowercase = (value) => {
  return /[a-z]/.test(value);
}

export const validatorPasswordCapitalLetter = (value) => {
  return /[A-Z]/.test(value);
}

export const validatorPasswordNumber = (value) => {
  return /[0-9]/.test(value);
}

export const validatorNoSpaces = (value) => {
  const regex = / /;
  return !regex.test(value);
}

export const validatorSpecialChar = (value) => {
  return /[!@#$%&*()]/.test(value);
}

export const validatorPassword = (password) => {
  /* eslint-disable no-useless-escape */
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
  /* eslint-enable no-useless-escape */
  const validPassword = regExp.test(password)
  return validPassword
}

export const validatorCreditCard = (creditnum) => {
  /* eslint-disable no-useless-escape */
  const cRegExp = /^(?:3[47][0-9]{13})$/
  /* eslint-enable no-useless-escape */
  const validCreditCard = cRegExp.test(creditnum)
  return validCreditCard
}

export const validatorUrlValidator = (val) => {
  if (val === undefined || val === null || val.length === 0) {
    return true
  }
  /* eslint-disable no-useless-escape */
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
  /* eslint-enable no-useless-escape */
  return re.test(val)
}
