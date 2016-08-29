import React, { PropTypes } from 'react';
import styles from './Logo.css';

const Logo = props => {
  const { logoSrc } = props;
  return (
    <div>
      <img src={logoSrc} role="presentation" styles={styles.logo} />
    </div>
  );
};

Logo.propTypes = {
  logoSrc: PropTypes.string,
};

Logo.defaultProps = {
  logoSrc: './../resources/gift.svg',
};

export default Logo;
