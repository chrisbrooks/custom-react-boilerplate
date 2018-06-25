import React from 'react';
import PropTypes from 'prop-types';
import styles from './Title.scss';

const Title = ({ children, className }) => (
  <h2 className={`${styles.Title} ${className}`}>{children}</h2>
);

Title.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string
};

export default Title;
