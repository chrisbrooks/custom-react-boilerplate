import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './button.scss';

const Button = ({
  className,
  secondary,
  disabled,
  loading,
  children,
  onClick
}) => (

  <button
    type="button"
    className={cx(styles.Button, className, {
      [styles.Secondary]: secondary && !disabled,
      [styles.Primary]: !secondary && !disabled,
      [styles.Disabled]: disabled,
      [styles.Loading]: loading
    })}
    onClick={onClick} disabled={disabled}>
    {children}
  </button>

);

Button.propTypes = {
  className: PropTypes.string,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default Button;
