import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import RectangleButton from './../../src/components/RectangleButton/RectangleButton';

describe('RectangleButton component', function() {
  const wrapper = shallow(<RectangleButton
    color={'blue'}
    url={''}
    width={'50px'}
    text={'click me!'}
  />)
  it('should have an <a> tag', function() {
    expect(wrapper.find('a').length).to.equal(1);
  });

  it('should have a <button> tag', function() {
    expect(wrapper.find('button').length).to.equal(1);
  })
})