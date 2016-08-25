import React, { PropTypes } from 'react';
import Logo from './../Logo/Logo';

const randomColor = `#${Math.ranom().toString(16).substr(-6)}`;
const headerStyle = {
  backgroundColor: randomColor,
};

const Header = headerInfo => {
  const { logoSrc } = headerInfo;
  return (
    <div style={headerStyle}>
      <Logo logoSrc={logoSrc} />
    </div>
  );
};

Header.propTypes = {
  logoSrc: PropTypes.string,
};

Header.defaultProps = {
  logoSrc: './../resources/gift.svg',
};

export default Header;
