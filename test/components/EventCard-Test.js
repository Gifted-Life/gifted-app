import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import EventCard from '../../src/components/EventCard/EventCard';
import EventCardInfo from '../../src/components/EventCard/EventCard';

describe('EventCard Component', function() {
  const eventInfo = {
    eventImg: '',
    eventName: 'awesome event',
    location: {},
    timeAndDate: 'now',
    peopleGoing: []
  }
  const wrapper = shallow(<EventCard eventInfo={eventInfo} />);

  it ('should have an img tag', function() {
    expect(wrapper.find('img').length).to.eql(1);
  })

  it('should render an EventCardInfo component ', function() {
    expect(wrapper.find(EventCardInfo).length).to.eql(1);
  })
})