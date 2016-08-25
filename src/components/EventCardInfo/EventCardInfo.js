import React, { PropTypes } from 'react';
import RectangleButton from './../RectangleButton/RectangleButton';

const EventCardInfo = ({ eventID, eventName, location, timeAndDate, peopleGoing }) => {
  return (
    <div>
      <h3>{eventName}</h3>
      <hr />
      <p>{location.name}</p>
      <p>{`${location.address} ${location.city}, ${location.state} ${location.zip}`}</p>
      <p>{timeAndDate}</p>
      <p><span>{peopleGoing}</span> people going</p>
      <RectangleButton
        color={'blue'}
        url={''}
        text={'More Info'}
      />
    </div>
  );
};

EventCardInfo.propTypes = {
  eventID: PropTypes.string,
  eventName: PropTypes.string,
  location: PropTypes.object,
  timeAndDate: PropTypes.string,
  peopleGoing: PropTypes.number,
};

EventCardInfo.defaultProps = {
  eventName: '',
  location: {},
  timeAndDate: '',
  peopleGoing: 0,
};

export default EventCardInfo;
