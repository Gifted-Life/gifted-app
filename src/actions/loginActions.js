import * as types from './actionTypes.js';

export function emailInputAction(input) {
  return {
    type: types.EMAIL_ADDRESS_INPUT,
    emailInput: input,
  };
}

export function passwordInputAction(input) {
  return {
    type: types.PASSWORD_INPUT,
    passwordInput: input,
  };
}
