import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import Logo from './../../src/components/Logo/Logo';

describe('Logo Component ', function() {
  const logoSrc = ''

  it('should display a picture', function() {
    const wrapper = shallow(<Logo logoSrc={logoSrc} />);
    expect(wrapper.find('img').length).to.eql(1);
  })
  it('should have a fallback picture if no url provided', function() {
    const wrapper = shallow(<Logo logoSrc={logoSrc} />);
    expect(wrapper.find('img').length).to.eql(1);
  })
});
