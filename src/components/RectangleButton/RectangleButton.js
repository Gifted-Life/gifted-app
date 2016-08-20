import style from './RectangleButton.css';
import React, { PropTypes } from 'react';

const RectangleButton = ({ color, url, width, text, handleClick, type }) => {
  const buttonStyle = {
    backgroundColor: color,
    width,
  };

  return (
    <a href={url}>
      <button style={buttonStyle} onClick={handleClick}>
        {text}
      </button>
    </a>
  );
};

RectangleButton.propTypes = {
  color: PropTypes.string,
  url: PropTypes.string.isRequired,
  width: PropTypes.string,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};

export default RectangleButton;
