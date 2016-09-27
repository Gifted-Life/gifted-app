import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import ErrorMessage from './../../src/components/ErrorMessage/ErrorMessage.js';

describe('Error Message Component', () => {
  const errorMsgID = 'loginError';
  const errorMsgText = 'Incorrect email address or password';
  const wrapper = shallow(<ErrorMessage errorMsgID={errorMsgID} errorMsgText={errorMsgText} />);

  it('should render a div with an id equal to the errorMsgID prop', () => {
    expect(wrapper.find(`div #${errorMsgID}`)).to.have.length(1);
  });

  it('should display error message text equal to the errorMsgText prop', () => {
    expect(wrapper.find('div').text()).to.equal('Incorrect email address or password');
  });
});
