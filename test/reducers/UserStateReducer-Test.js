import React from 'react';
import { expect } from 'chai';
import * as types from './../../src/actions/actionTypes.js';
import userStateReducer from './../../src/reducers/userStateReducer.js';

describe('User State Reducer', () => {
  
  const initialState = {
    email: '',
    password: '',
    emptyLoginField: false,
  };

  const emailAddressAction = {
    type: types.EMAIL_ADDRESS_INPUT,
    emailInput: 'hello@hi.com',
  };

  const passwordInputAction = {
    type: types.PASSWORD_INPUT,
    passwordInput: 'hola',
  };

  const emptyLoginFieldAction = {
    type: types.EMPTY_LOGIN_FIELD,
  };

  it('should return the initial state', () => {
    expect(userStateReducer(undefined, {})).to.eql(initialState);
  });

  it('should handle email address input action', () => {
    expect(userStateReducer(undefined, emailAddressAction)).to.eql({
      email: 'hello@hi.com',
      password: '',
      emptyLoginField: false,
    });
  });

  it('should handle password input action', () => {
    expect(userStateReducer(undefined, passwordInputAction)).to.eql({
      email: '',
      password: 'hola',
      emptyLoginField: false,
    });
  });

  it('should handle missing login password field', () => {
    const testState = {
      email: 'hello@hi.com',
      password: '',
      emptyLoginField: false,
    };
    expect(userStateReducer(testState, emptyLoginFieldAction)).to.eql({
      email: 'hello@hi.com',
      password: '',
      emptyLoginField: true,
    });
  });

  it('should handle missing login email field', () => {
    const testState = {
      email: '',
      password: 'hola',
      emptyLoginField: false,
    };
    expect(userStateReducer(testState, emptyLoginFieldAction)).to.eql({
      email: '',
      password: 'hola',
      emptyLoginField: true,
    });
  });
});
