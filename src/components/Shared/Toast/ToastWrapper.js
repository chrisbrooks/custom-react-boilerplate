import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { dismissToast } from './toast.actions';
import Toast from './Toast';

export const ToastWrapperComponent = ({ type, message, dismiss, show = false }) => (
  <Toast
    type={type}
    dismiss={dismiss}
    show={show}>
    {message || 'Unknown error message'}
  </Toast>
);

ToastWrapperComponent.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  show: PropTypes.bool,
  dismiss: PropTypes.func.isRequired,
};

export default connect(
  ({ toast }) => ({
    type: toast.type,
    message: toast.message,
    show: toast.show,
  }),
  dispatch => ({
    dismiss: () => dispatch(dismissToast())
  })
)(ToastWrapperComponent);
