import React, { PropTypes } from 'react';

const EventCardInfo = props => {
  return (
    <div>
      <p>{props.eventName}</p>
      <p>{props.location.name}</p>
    </div>
  );
};

EventCardInfo.propTypes = {
  eventId: PropTypes.string,
  eventName: PropTypes.string,
  location: PropTypes.object,
  timeAndDate: PropTypes.string,
  peopleGoing: PropTypes.number,
};

export default EventCardInfo;
