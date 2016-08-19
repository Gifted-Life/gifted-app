import style from './RectangleButton.css';
import React, { PropTypes } from 'react';

const RectangleButton = ({ color, url, width, text }) => {
  const buttonStyle = {
    backgroundColor: color,
    width,
  };

  return (
    <a href={url}>
      <button style={buttonStyle}>
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
};

export default RectangleButton;
