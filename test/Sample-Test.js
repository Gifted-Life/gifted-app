import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import App from './../src/components/App';

describe('Sample tests', function() {
  it('should do something', function() {
    const wrapper = shallow(<App />);
    expect(wrapper.text()).to.eql('Hello World!')
  })
})
