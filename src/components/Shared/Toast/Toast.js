import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './toast.scss';

export const Type = {
  SUCCESS: 'Success',
  DANGER: 'Danger'
};

const Toast = ({ type, dismiss, children, show, timeoutAmount = 10000 }) => {

  if (show) {
    setTimeout(() => {
      dismiss();
    }, timeoutAmount);
  }

  return (
    <div className={show ? styles.ContainerOpen : styles.Container}>
      <div className={styles.Inner}>
        <div className={cx(styles.Toast, styles[type])}>
          { children }
          <p className={styles.Icon}onClick={dismiss}>X</p>
        </div>
      </div>
    </div>
  );
};

Toast.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
  show: PropTypes.bool,
  timeoutAmount: PropTypes.number,
  dismiss: PropTypes.func
};

export default Toast;
