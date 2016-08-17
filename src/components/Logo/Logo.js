import React, { PropTypes } from 'react';

const Logo = props => {
  return (
    <div>
      <img src={props.imgSrc} role="presentation" />
    </div>
  );
};

Logo.propTypes = {
  imgSrc: PropTypes.string,
};

export default Logo;
