import React, { PropTypes } from 'react';
import RectangleButton from '../RectangleButton/RectangleButton';
import style from './BannerEvent.scss';

const BannerEvent = ({ name, id, eventImg }) => (
  <div className={style.bannerevent}>
    <div className={style.betop}>
      <img src={eventImg} />
      <p>{name}</p>
    </div>
    <div>
      <RectangleButton text={'See Event'} />
      <RectangleButton text={'Get Directions'} />
    </div>
  </div>
  );

BannerEvent.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  eventImg: PropTypes.string,
};

export default BannerEvent;
