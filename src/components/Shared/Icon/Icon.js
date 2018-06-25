import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Icon.scss';

const Icon = ({
  type,
  className,
  ...props,
}) => (
  <i
    className={cx(styles.Icon, styles[type], className)}
    data-icon={type}
    {...props} />
);

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default Icon;
