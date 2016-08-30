import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Login from './../../src/containers/LoginContainer/LoginContainer.js';
import FormInput from './../../src/components/FormInputs/FormInput.js';
import RectangleButton from './../../src/components/RectangleButton/RectangleButton.js';
import ErrorMessage from './../../src/components/ErrorMessage/ErrorMessage.js';

describe('Login Component', () => {
  const wrapper = mount(<Login />);

  it('should render two form input components', () => {
    expect(wrapper.find(FormInput)).to.have.length(2);
  });

  it('should render one email input', () => {
    expect(wrapper.find('input [type="email"]')).to.have.length(1);
  });

  it('should render one password input', () => {
    expect(wrapper.find('input [type="password"]')).to.have.length(1);
  });

  it('should render a login header', () => {
    expect(wrapper.find('h1')).to.have.length(1);
  });

  it('should render a submit button', () => {
    expect(wrapper.find(RectangleButton)).to.have.length(1);
  });

  it('should render a form', () => {
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('should not initially render an error message', () => {
    expect(wrapper.find(ErrorMessage)).to.have.length(0);
  });

  xit('should display an error message if incorrect email or password', () => {

  });

  xit('should dispatch a password input action on each user input', () => {

  });

  xit('should dispatch an email input action on each user input', () => {
   
  });

  xit('should set the state with email input on each change', () => {

  });

  xit('should set state with password input on each change', () => {

  });
});