import React, { PropTypes } from 'react';
import styles from './RectangleButton.scss';

// types: submit, next, ???

const RectangleButton = ({ color, url, width, text, handleClick, type }) => {
  const buttonStyle = {
    backgroundColor: color,
    width,
  };

  return (
    <a href={url}>
      <button className={styles[type]} onClick={handleClick}>
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
