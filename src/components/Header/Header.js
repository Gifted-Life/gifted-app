import React, { PropTypes } from 'react';
import Logo from './../Logo/Logo';

const Header = props => {
  return (
    <div>
      <Logo imgSrc={props.imgSrc} />
    </div>
  );
};

Header.propTypes = {
  imgSrc: PropTypes.string,
};

export default Header;
