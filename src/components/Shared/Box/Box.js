import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Box.scss';

const Box = ({
  className,
  children,
  noMargin,
  noBottomPadding,
  noPadding,
  right,
  minHeight
}) => (
  <div
    className={cx(styles.Box, className, {
      [styles.noBottomPadding]: noBottomPadding,
      [styles.noPadding]: noPadding,
      [styles.Right]: right,
      [styles.noMargin]: noMargin
    })}
    style={{ minHeight }}>
    { children }
  </div>
);

Box.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  noBottomPadding: PropTypes.bool,
  noPadding: PropTypes.bool,
  right: PropTypes.bool,
  noMargin: PropTypes.bool,
  minHeight: PropTypes.string
};

export default Box;
