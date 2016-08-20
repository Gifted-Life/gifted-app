import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import EventCardInfo from './../../src/components/EventCardInfo/EventCardInfo';
import RectangleButton from './../../src/components/RectangleButton/RectangleButton'

describe('EventCardInfo Component ', function() {
  it ('should have a header with event name', function() {
    const wrapper = shallow(<EventCardInfo eventName={'awesome event'}/>);
    expect(wrapper.find('h3').text()).to.equal('awesome event')
  })

  it('should have 4 <p> tags', function() {
    const wrapper = shallow(<EventCardInfo />);
    expect(wrapper.find('p').length).to.equal(4);
  })

  xit('should have a button component', function() {
    const wrapper = shallow(<EventCardInfo />);
    expect(wrapper.find(RectangleButton).length).to.equal(1);
  })
})
