import * as ACTIONS from './toast.actionTypes';

export const showToast = (type, message) => ({
  type: ACTIONS.SHOW_TOAST,
  payload: {
    type,
    message
  }
});

export const dismissToast = () => ({
  type: ACTIONS.DISMISS_TOAST
});
