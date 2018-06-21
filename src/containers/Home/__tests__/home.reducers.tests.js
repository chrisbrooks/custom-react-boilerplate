import reducer from '../home.reducers';
import * as ACTIONS from '../home.actionTypes';

describe('test reducers', () => {

  const initialState = {
    userLocation: null,
    leftSidebar: false,
    rightSidebar: false
  };

  it('should handle TOGGLE_LEFT_SIDEBAR', () => {

    expect(reducer(initialState, {
      type: ACTIONS.TOGGLE_LEFT_SIDEBAR,
      payload: true
    })).toEqual({
      ...initialState,
      leftSidebar: true
    });
  });

  it('should handle GET_USER_LOCATION_SUCCESS', () => {
    const payload = {
      country: 'AU',
      state: 'Victoria'
    };
    expect(reducer(initialState, {
      type: ACTIONS.GET_USER_LOCATION_SUCCESS,
      payload
    })).toEqual({
      ...initialState,
      userLocation: payload
    });
  });

  it('should handle GET_USER_LOCATION_FAILURE', () => {
    const payload = {
      country: 'AU'
    };
    expect(reducer(initialState, {
      type: ACTIONS.GET_USER_LOCATION_FAILURE,
      payload
    })).toEqual({
      ...initialState,
      userLocation: payload
    });
  });

  it('should return the default state', () => {

    const state = { ...initialState };
    expect(reducer((state), {})).toEqual(initialState);

  });
});
