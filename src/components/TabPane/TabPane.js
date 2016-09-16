import React, { PropTypes } from 'react';
import styles from './TabPane.scss';

const TabPane = ({ label, children }) => (
  <div>
    {children}
  </div>
);

TabPane.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default TabPane;
