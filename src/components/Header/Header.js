import React, { PropTypes } from 'react';
import Logo from './../Logo/Logo';

const randomColor = `#${Math.ranom().toString(16).substr(-6)}`;
const headerStyle = {
  backgroundColor: randomColor,
};

const Header = props =>
(
  <div style={headerStyle}>
    <Logo imgSrc={props.imgSrc} />
  </div>
);

Header.propTypes = {
  imgSrc: PropTypes.string,
};

export default Header;
