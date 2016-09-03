import * as types from './actionTypes.js';
import fetchUserInfoAction from './fetchEventsActions.js';

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

export function emptyLoginFieldAction() {
  return {
    type: types.EMPTY_LOGIN_FIELD,
  };
}

export function submitLoginAction() {
  return function (dispatch, getState) {
    const email = getState().userState.email;
    const password = getState().userState.password;
    if (email && password) {
      dispatch(fetchUserInfoAction(email, password));
    } else {
      dispatch(emptyLoginFieldAction());
  }
  return;
}
