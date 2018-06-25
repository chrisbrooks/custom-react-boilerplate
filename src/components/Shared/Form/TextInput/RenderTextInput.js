import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Icon from 'components/Shared/Icon/Icon';

import styles from './renderTextInput.scss';

const renderTextInput = ({
  input,
  className,
  placeholder,
  label,
  hideLabel,
  type,
  guide,
  image,
  icon,
  overrideTouched,
  meta: {
    touched,
    error
  }
}) => (
  <div
    className={cx('p-rel', className, {
      'has-error': (touched || overrideTouched) && error
    })}>
    <label className={hideLabel ? 'hide-label' : ''}>{label}</label>
    {
      guide && <span className={styles.Guide}>{guide}</span>
    }
    {image && <img
      className={styles.Image}
      src={image}
      alt="" />
    }
    {
      icon && <div className={styles.Icon}><Icon type={icon} /></div>
    }
    <input
      type={type}
      {...input}
      placeholder={placeholder} />
    {
      (touched || overrideTouched) && (error && <div className="error-message">{error}</div>)
    }
  </div>
);

renderTextInput.propTypes = {
  input: PropTypes.object,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  guide: PropTypes.string,
  image: PropTypes.string,
  icon: PropTypes.string,
  meta: PropTypes.object,
  overrideTouched: PropTypes.bool,
  hideLabel: PropTypes.bool
};

export default renderTextInput;
