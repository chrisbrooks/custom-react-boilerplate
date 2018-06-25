import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './renderPasswordInput.scss';

class RenderPasswordInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'password'
    };
    this.handleShowHide = this.handleShowHide.bind(this);
  }

  handleShowHide() {
    this.setState({
      type: this.state.type === 'text' ? 'password' : 'text'
    });
  }

  render() {

    const {
      input,
      className,
      placeholder,
      label,
      guide,
      overrideTouched,
      hideLabel,
      meta: {
        touched,
        error
      }
    } = this.props;

    return (
      <div
        className={cx('p-rel', className, {
          'has-error': (touched || overrideTouched) && error
        })}>
        <label className={hideLabel ? 'hide-label' : ''}>{label}</label>
        {
          guide && <span className={styles.Guide}>{guide}</span>
        }
        <input
          autoComplete="off"
          type={this.state.type}
          {...input}
          placeholder={placeholder} />
        <span className={styles.Toggle} onClick={this.handleShowHide}>{this.state.type === 'text' ? 'Hide' : 'Show'}</span>
        {
          (touched || overrideTouched) && (error && <div className="error-message">{error}</div>)
        }
      </div>
    );
  }
}

RenderPasswordInput.propTypes = {
  input: PropTypes.object,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  guide: PropTypes.string,
  meta: PropTypes.object,
  overrideTouched: PropTypes.bool,
  hideLabel: PropTypes.bool
};

export default RenderPasswordInput;
