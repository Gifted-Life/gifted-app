import React, { PropTypes } from 'react';
import styles from './Logo.css';

const Logo = props => {
  return (
    <div>
      <img src={props.imgSrc} role="presentation" style={styles.logo} />
    </div>
  );
};

Logo.propTypes = {
  imgSrc: PropTypes.string,
};

export default Logo;
