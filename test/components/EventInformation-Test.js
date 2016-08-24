import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import EventInformation from '../../src/components/EventInformation/EventInformation';

describe('EventInformation Component', function() {
  const wrapper = shallow(<EventInformation
    type={'Location'}
    info={'5300 Beethoven St, Los Angeles, CA'}
  />)
  it('should have a header tag', function() {
    expect(wrapper.find('h3').length).to.eql(1);
  })

  it('should have a p tag', function() {
    expect(wrapper.find('p').length).to.eql(1);
  })
})