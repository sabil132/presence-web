import {
    Form as VeeForm,
    Field as VeeField,
    defineRule,
    ErrorMessage,
    configure,
  } from 'vee-validate';
  
  import {
    required,
    min,
    max,
    numeric,
    alpha_spaces as alphaSpaces,
    email,
    min_value as minVal,
    max_value as maxVal,
    not_one_of as excluded,
    confirmed,
  } from '@vee-validate/rules';
  
  import {
    validatorPasswordSame,
    validatorNoSpaces,
    validatorPositive,
    validatorUrlValidator,
    validatorPassword,
    validatorCreditCard,
    validatorPasswordLength,
    validatorPasswordCapitalLetter,
    validatorPasswordNumber,
    validatorSpecialChar
  } from '@/helpers/validateHelpers'
  
  export default {
    install(app) {
      app.component('VeeForm', VeeForm);
      app.component('VeeField', VeeField);
      app.component('ErrorMessage', ErrorMessage);
  
      defineRule('required', required);
      defineRule('min', min);
      defineRule('numeric', numeric);
      defineRule('max', max);
      defineRule('alpha_spaces', alphaSpaces);
      defineRule('email', email);
      defineRule('min_value', minVal);
      defineRule('max_value', maxVal);
      defineRule('excluded', excluded);
      defineRule('match', confirmed);
      defineRule('confirmed', validatorPasswordSame);
  
      // custom defined
      defineRule('positive', validatorPositive);
      defineRule('credit-card', validatorCreditCard);
      defineRule('no-space', validatorNoSpaces);
      defineRule('special-char', validatorSpecialChar);
      defineRule('password', validatorPassword);
      defineRule('pass-length', validatorPasswordLength);
      defineRule('pass-capital', validatorPasswordCapitalLetter);
      defineRule('pass-number', validatorPasswordNumber);
      defineRule('url', validatorUrlValidator);
  
      configure({
        generateMessage: (context) => {
          const messages = {
            required: `The ${context.field} field is required.`,
            min: `The ${context.field} field is too short.`,
            max: `The ${context.field} field is too long.`,
            numeric: `The ${context.field} must be a number.`,
            alpha_spaces: `The ${context.field} field can only contain letters and spaces.`,
            email: `The ${context.field} field is not a valid email.`,
            min_value: `The ${context.field} field is too low.`,
            max_value: `The ${context.field} field is too high.`,
            excluded: 'This field is not allowed.',
            match: `The ${context.field} field does not match.`,
            positive: 'Please enter positive number!',
            confirmed: `${context.field} not match`,
            'credit-card': 'It is not valid credit card!',
            'no-space': `Your ${context.field} must not have any spaces`,
            'special-char': `Your ${context.field} must have one special character`,
            password: `Your ${context.field} must contain A-z, 0-9, Symbol, min 8 characters`,
            'pass-length': `Your ${context.field} length must between 8 - 12 Characters`,
            'pass-capital': `Your ${context.field} must have, At least one capital letter`,
            'pass-number': `Your ${context.field} must have, At least one number`
          };
  
          return messages[context.rule.name]
            ? messages[context.rule.name]
            : `The field ${context.field} is invalid`;
        },
        validateOnBlur: true,
        validateOnChange: true,
        validateOnInput: false,
        validateOnModelUpdate: true,
      });
    },
  };