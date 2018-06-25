import * as ACTIONS from './toast.actionTypes';
import initialState from './toast.initialState';

const toast = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SHOW_TOAST: {
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
        show: true
      };
    }
    case ACTIONS.DISMISS_TOAST: {
      return {
        ...state,
        show: false
      };
    }
    default: {
      return state;
    }
  }
};

export default toast;
