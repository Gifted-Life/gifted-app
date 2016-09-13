import React, { PropTypes } from 'react';
import MatchInfo from '../../components/MatchInfo/MatchInfo';
import EventInformation from '../../components/EventInformation/EventInformation';
import styles from './EventContainer.scss';

const EventContainer = ({ matchInfo, eventInfo }) => {
  const { matchName, matchID, matchPicture } = matchInfo;
  const { eventName, location, timeAndDate, peopleGoing, price, comments } = eventInfo;
  return (
    <div className={styles.eventContainer}>
      <h2>{eventName}</h2>
      <MatchInfo
        matchName={matchName}
        matchID={matchID}
        matchPicture={matchPicture}
      />
      <EventInformation
        type={'Date / Time'}
        info={`${timeAndDate.startTime} - ${timeAndDate.endTime}`}
      />
      <EventInformation
        type={'Location'}
        info={(<div><p>{location.name}</p>
          <p>{`${location.address} ${location.city}, ${location.state} ${location.zip}`}</p></div>)}
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
