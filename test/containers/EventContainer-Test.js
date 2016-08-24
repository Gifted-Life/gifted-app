import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import EventContainer from '../../src/containers/EventContainer/EventContainer';
import MatchInfo from '../../src/components/MatchInfo/MatchInfo';
import EventInformation from '../../src/components/EventInformation/EventInformation';
import moment from 'moment';



describe('EventContainer container', function() {
  const eventInfo = {
    eventName: '',
    location: {
      name: 'Codesmith',
      address: '5300 beehotven st',
      city: 'los angeles',
      state: 'CA',
      zip: '90307'
    },
    timeAndDate: {
      startTime: 'tempstart',
      endTime: 'tempend',
    },
    price: {
      low: 20,
      high: 50,
    },
    peopleGoing: [
      'mom',
      'not mom',
    ],
    comments: 'bring ya party pants'
  }

  const matchInfo = {
    matchName: '',
    matchId: '',
    matchPicture:''
  }
  const wrapper = shallow(<EventContainer
    eventInfo={eventInfo}
    matchInfo={matchInfo}
  />)
  it('should have one MatchInfo component', function() {
    expect(wrapper.find(MatchInfo).length).to.eql(1);
  })

  it('should have 5 EventInformation components', function() {
    expect(wrapper.find(EventInformation).length).to.eql(5);
  })
})