import React, { PropTypes } from 'react';
import styles from './TabHolder.scss';

const TabHolder = ({ current, children }) => (
  <div>
    <ul className={styles.tablist}>
    {Array.isArray(children) ? children.map((child, i) => <li key={i}>{child.props.label}</li>) : null}
    </ul>
    {}
    {Array.isArray(children) ? children[current] : children}
  </div>
  );

TabHolder.propTypes = {
  current: PropTypes.number,
  children: PropTypes.oneOf([PropTypes.array, PropTypes.element]),
};

TabHolder.defaultProps = {
  current: 0,
};

export default TabHolder;


