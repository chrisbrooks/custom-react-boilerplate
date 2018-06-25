import network from 'utils/network';
import * as ACTIONS from './app.actionTypes';

export const reset = () => ({
  type: ACTIONS.RESET
});

export const toggleLeftShow = () => ({
  type: ACTIONS.LEFT_SIDEBAR_SHOW
});

export const toggleLeftHide = () => ({
  type: ACTIONS.LEFT_SIDEBAR_HIDE
});

export const toggleRightShow = () => ({
  type: ACTIONS.RIGHT_SIDEBAR_SHOW
});

export const toggleRightHide = () => ({
  type: ACTIONS.RIGHT_SIDEBAR_HIDE
});

export const apiEndPoint = 'https://freegeoip.net/json/';

export function getUserLocation() {
  return dispatch => (
    network.get(apiEndPoint)
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
          payload: { country: 'AU' }
        });
        return error;
      })
  );
}
