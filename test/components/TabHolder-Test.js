import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import TabHolder from './../../src/components/TabHolder/TabHolder';

describe('TabHolder component', function() {
  const foo = <div className="foo">yo</div>;
  const bar = <div className="bar">sup</div>;
  const wrapper = shallow(<TabHolder>
    {foo}
    {bar}
  </TabHolder>);
  const wrapper2 = shallow(<TabHolder current={1}>
    {foo}
    {bar}
  </TabHolder>);
  it('should render first tab by default', function() {
    expect(wrapper.find('.foo').length).to.equal(1);
  });

  it('should should render the correct tab', function() {
    expect(wrapper2.find('.bar').length).to.equal(1);
  });
})