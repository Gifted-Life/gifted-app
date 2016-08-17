import React, { PropTypes } from 'react';
import { Logo } from './../Logo';

const Header = props => {
  return (
    <div>
      <Logo />
    </div>
  );
};

Header.propTypes = {
  imgSrc: PropTypes.string,
};

export default Header;
