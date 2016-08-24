import style from './RectangleButton.css';
import React, { PropTypes } from 'react';

// types: submit, next, ???

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

RectangleButton.defaultProps = {
  color: 'green',
  url: '',
  width: '50px',
  handleClick: () => console.log('placeholder'),
};

export default RectangleButton;
