import React from 'react';
import { expect } from 'chai';
import * as types from './../../src/actions/actionTypes.js';
import userStateReducer from './../../src/reducers/userStateReducer.js';

describe('User State Reducer', () => {
  
  const initialState = {
    email: '',
    password: '',
    correctLoginEmailAndPw: true,
  };

  const emailAddressAction = {
    type: types.EMAIL_ADDRESS_INPUT,
    emailInput: 'hello@hi.com',
  };

  const passwordInputAction = {
    type: types.PASSWORD_INPUT,
    passwordInput: 'hola',
  };

  it('should return the initial state', () => {
    expect(userStateReducer(undefined, {})).to.eql(initialState);
  });

  it('should handle email address input action', () => {
    expect(userStateReducer(undefined, emailAddressAction)).to.eql({
      email: 'hello@hi.com',
      password: '',
      correctLoginEmailAndPw: true,
    });
  });

  it('should handle password input action', () => {
    expect(userStateReducer(undefined, passwordInputAction)).to.eql({
      email: '',
      password: 'hola',
      correctLoginEmailAndPw: true,
    });
  });
});
