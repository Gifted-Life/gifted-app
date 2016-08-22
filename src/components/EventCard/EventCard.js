import React, { PropTypes } from 'react';

const EventCard = ({ eventInfo }) => {
  const { eventImg, eventId, eventName, location, timeAndDate, peopleGoing } = eventInfo;
  return (
    <div>
      <img src={eventImg} alt={'I am the event.'} />
      <EventCardInfo
        eventId={eventId}
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
