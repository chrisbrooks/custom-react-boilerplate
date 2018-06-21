import * as ACTIONS from './home.actionTypes';

const initialState = {
  leftSidebar: false,
  userLocation: null
};

const home = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.TOGGLE_LEFT_SIDEBAR: {
      const leftSidebar = action.payload;
      return {
        ...state,
        leftSidebar
      };
    }
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
    default:
      return state;
  }
};

export default home;
