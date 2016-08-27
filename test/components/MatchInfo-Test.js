import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import MatchInfo from './../../src/components/MatchInfo/MatchInfo';
import RectangleButton from './../../src/components/RectangleButton/RectangleButton';


describe('MatchInfo component', function() {
  const matchName = 'ur dream';
  const matchID = '123abc';
  const matchPicture = ''
  it('should display a picture', function() {
    const wrapper = mount(<MatchInfo
      matchName={matchName}
      matchPicture={matchPicture}
      matchID={matchID}
    />);
    expect(wrapper.find('img').length).to.eql(1);
  })

  it('should have a fallback picture if no url provided', function() {
    const wrapper = mount(<MatchInfo
      matchName={matchName}
      matchID={matchID}
    />);
    expect(wrapper.find('img').length).to.eql(1);
  })

  it('should have a RectangleButton component', function() {
    const wrapper = mount(<MatchInfo
      matchName={matchName}
      matchPicture={matchPicture}
      matchID={matchID}
    />);
    expect(wrapper.find(RectangleButton).length).to.eql(1);
  })
})