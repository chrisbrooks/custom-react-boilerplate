import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './blockButton.scss';

const BlockButton = ({
  className,
  style,
  primary = false,
  disabled,
  loading,
  children,
  onClick
}) => (

  <button
    type="button"
    className={cx(styles.Button, className, {
      [styles.Primary]: primary && !disabled,
      [styles.Secondary]: !primary && !disabled,
      [styles.Disabled]: disabled,
      [styles.Loading]: loading
    })}
    style={style}
    onClick={onClick} disabled={disabled}>
    {children}
  </button>

);

BlockButton.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default BlockButton;
