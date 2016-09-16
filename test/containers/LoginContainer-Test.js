import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { mount } from 'enzyme';
import { expect } from 'chai';
import nock from 'nock';
import LoginContainer from './../../src/containers/LoginContainer/LoginContainer.js';
import reducers from './../../src/reducers/index.js';

const fakeStore = function (injectedState) {
  return createStore(
    reducers,
    injectedState,
    applyMiddleware(thunkMiddleware)
  );
};

const testURL = 'http://FAKEURL';

describe('Login Container Component', () => {

  it('should set state with email input on each change', () => {
    const testStore = fakeStore({});
    const wrapper = mount(
      <Provider store={testStore}>
        <LoginContainer />
      </Provider>
    );

    wrapper.find('input [type="email"]').simulate('change', { target: { value: 'a' } });
    expect(testStore.getState().userState.email).to.equal('a');
  });

  it('should set state with password input on each change', () => {
    const testStore = fakeStore({});
    const wrapper = mount(
      <Provider store={testStore}>
        <LoginContainer />
      </Provider>
    );

    wrapper.find('input [type="password"]').simulate('change', { target: { value: 'b' } });
    expect(testStore.getState().userState.password).to.equal('b');
  });

  xit('should display an error message if incorrect email or password', () => {
    // Trouble testing because this click dispatches an async action that returns
    // after the test has checked the component
    nock(testURL)
      .log(console.log)
      .post('/user/login')
      .reply(400, 'Incorrect email or password');
    
    const testStore = fakeStore(
      { userState: {
        email: 'nope@hi.com',
        password: 'wrong',
        emptyLoginField: false },
      });
    const wrapper = mount(
      <Provider store={testStore}>
        <LoginContainer />
      </Provider>
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.find('#loginError')).to.have.length(1);
  });

  xit('should redirect to user page if correct email and password', () => {

  });

  it('should display an error message if empty email field was submitted', () => {
    const testStore = fakeStore(
      { userState: {
        email: '',
        password: 'hola',
        emptyLoginField: false },
      });
    const wrapper = mount(
      <Provider store={testStore}>
        <LoginContainer />
      </Provider>
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.find('#emptyLoginInputError')).to.have.length(1);
  });

  it('should display an error message if empty password field was submitted', () => {
    const testStore = fakeStore(
      { userState: {
        email: 'hello@hi.com',
        password: '',
        emptyLoginField: false },
      });
    const wrapper = mount(
      <Provider store={testStore}>
        <LoginContainer />
      </Provider>
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.find('#emptyLoginInputError')).to.have.length(1);
  });

  it('should display an error message if empty password and email fields are submitted', () => {
    const testStore = fakeStore(
      { userState: {
        email: '',
        password: '',
        emptyLoginField: false },
      });
    const wrapper = mount(
      <Provider store={testStore}>
        <LoginContainer />
      </Provider>
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.find('#emptyLoginInputError')).to.have.length(1);
  });
});
