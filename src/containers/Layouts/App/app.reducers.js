import * as ACTIONS from './app.actionTypes';

const initialState = {
  leftSidebar: false,
  rightSidebar: false,
  userLocation: null
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LEFT_SIDEBAR_SHOW:
      return {
        ...state,
        leftSidebar: true
      };
    case ACTIONS.LEFT_SIDEBAR_HIDE:
      return {
        ...state,
        leftSidebar: false
      };
    case ACTIONS.RIGHT_SIDEBAR_SHOW:
      return {
        ...state,
        rightSidebar: true
      };
    case ACTIONS.RIGHT_SIDEBAR_HIDE:
      return {
        ...state,
        rightSidebar: false
      };
    case ACTIONS.GET_USER_LOCATION_SUCCESS:
      return {
        ...state,
        userLocation: action.payload,
      };
    case ACTIONS.GET_USER_LOCATION_FAILURE:
      return {
        ...state,
        userLocation: action.payload
      };
    case ACTIONS.RESET:
      return initialState;
    default:
      return state;
  }
};

export default app;
