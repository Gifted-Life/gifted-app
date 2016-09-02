import React, { PropTypes } from 'react';
import style from './EventInformation.scss';

const EventInformation = ({ type, info }) => {
  info = typeof info === 'string' ? (<p>{info}</p>) : info;
  return (
    <div className={style.eventInfo}>
      <h3>{type}</h3>
      <hr />
      {info}
    </div>
  );
};

EventInformation.propTypes = {
  type: PropTypes.string.isRequired,
  info: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

EventInformation.defaultProps = {
  info: 'N/A',
};

export default EventInformation;
