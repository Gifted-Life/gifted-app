import style from './RectangleButton.scss';
import React, { PropTypes } from 'react';

// types: submit, next, ???

const RectangleButton = ({ url, width, text, handleClick, type }) => {

  return (
    <a href={url}>
      <button className={style[type]} onClick={handleClick}>
        {text}
      </button>
    </a>
  );
};

RectangleButton.propTypes = {
  type: PropTypes.string,
  url: PropTypes.string.isRequired,
  width: PropTypes.string,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

RectangleButton.defaultProps = {
  type: 'default',
  url: '',
  width: '50px',
  handleClick: () => console.log('placeholder'),
};

export default RectangleButton;
