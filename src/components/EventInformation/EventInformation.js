import React, { PropTypes } from 'react';

const EventInformation = ({ type, info }) => {
  return (
    <div>
      <h3>{type}</h3>
      <p>{info}</p>
    </div>
  );
};

EventInformation.propTypes = {
  type: PropTypes.string,
  info: PropTypes.string,
};

EventInformation.defaultProps = {
  info: 'N/A',
};

export default EventInformation;
