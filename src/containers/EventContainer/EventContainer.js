import React, { PropTypes } from 'react';
import MatchInfo from '../../components/MatchInfo/MatchInfo';
import EventInformation from '../../components/EventInformation/EventInformation';

const EventContainer = ({ matchInfo, eventInfo }) => {
  const { matchName, matchId, matchPicture } = matchInfo;
  const { eventName, location, timeAndDate, peopleGoing, price, comments } = eventInfo;
  return (
    <div>
      <h2>{eventName}</h2>
      <MatchInfo
        matchName={matchName}
        matchId={matchId}
        matchPicture={matchPicture}
      />
      <EventInformation
        type={'Date/Time'}
        info={`${timeAndDate.startTime} - ${timeAndDate.endTime}`}
      />
      <EventInformation
        type={'Location'}
        info={`${location.name}
        ${location.address} ${location.city}, ${location.state} ${location.zip}`}
      />
      <EventInformation
        type={'Price Range'}
        info={`$${price.low} - $${price.high}`}
      />
      <EventInformation
        type={'People attending'}
        info={peopleGoing.join(', ')}
      />
      <EventInformation
        type={'Additional Info'}
        info={comments}
      />
    </div>
  );
};

EventContainer.propTypes = {
  matchInfo: PropTypes.object,
  eventInfo: PropTypes.object,
};

export default EventContainer;
