import React, { PropTypes } from 'react';
import RectangleButton from '../RectangleButton/RectangleButton';

const MatchInfo = ({ matchName, matchID, matchPicture }) => {
  return (
    <div>
      <h4>you got matched with... </h4>
      <img src={matchPicture}></img>
      <RectangleButton
      color={'green'}
      url={matchID}
      text={`View ${matchName}'s wishlist`}
      />
    </div>
  );
};

MatchInfo.propTypes = {
  matchName: PropTypes.string.isRequired,
  matchID: PropTypes.string.isRequired,
  matchPicture: PropTypes.string,
};

MatchInfo.defaultProps = {
  matchPicture: '',
};

export default MatchInfo;
