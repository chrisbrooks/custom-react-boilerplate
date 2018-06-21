import axios from 'axios';

import * as ACTIONS from './home.actionTypes';

export const toggleLeftSidebar = value => ({
  type: ACTIONS.TOGGLE_LEFT_SIDEBAR,
  payload: value
});

export const apiEndPoint = 'https://freegeoip.net/json/';

export function getUserLocation() {
  return dispatch => (
    axios.get(apiEndPoint)
      .then((response) => {
        dispatch({
          type: ACTIONS.GET_USER_LOCATION_SUCCESS,
          payload: response.data
        });
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch({
          type: ACTIONS.GET_USER_LOCATION_FAILURE,
          payload: {
            country: 'AU'
          }
        });
        return error;
      })
  );
}
