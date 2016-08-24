import React, { PropTypes } from 'react';
import EventCardInfo from '../EventCardInfo/EventCardInfo';

const EventCard = ({ eventInfo }) => {
  const { eventImg, eventID, eventName, location, timeAndDate, peopleGoing } = eventInfo;
  return (
    <div>
      <img src={eventImg} alt={'I am the event.'} />
      <EventCardInfo
        eventID={eventID}
        eventName={eventName}
        location={location}
        timeAndDate={timeAndDate}
        peopleGoing={peopleGoing}
      />
    </div>
  );
};

EventCard.propTypes = {
  eventInfo: PropTypes.object,
};

export default EventCard;
