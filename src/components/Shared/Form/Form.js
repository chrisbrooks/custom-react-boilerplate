import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Form.scss';

const Form = ({
  className,
  children,
  onSubmit,
  WithoutLabels
}) => (
  <form
    className={cx(styles.Form, className, {
      [styles.WithoutLabels]: WithoutLabels
    })}
    onSubmit={onSubmit}>
    { children }
  </form>
);

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  WithoutLabels: PropTypes.bool
};

export default Form;
