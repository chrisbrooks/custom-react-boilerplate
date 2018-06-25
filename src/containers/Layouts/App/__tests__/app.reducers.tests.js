import reducer from '../app.reducers';
import * as ACTIONS from '../app.actionTypes';

describe('test reducers', () => {

  const initialState = {
    userLocation: null,
    leftSidebar: false,
    rightSidebar: false
  };

  it('should handle LEFT_SIDEBAR_SHOW', () => {

    expect(reducer(initialState, {
      type: ACTIONS.LEFT_SIDEBAR_SHOW
    })).toEqual({
      ...initialState,
      leftSidebar: true
    });
  });

  it('should handle LEFT_SIDEBAR_HIDE', () => {

    expect(reducer(initialState, {
      type: ACTIONS.LEFT_SIDEBAR_HIDE
    })).toEqual({
      ...initialState,
      leftSidebar: false
    });
  });

  it('should handle RIGHT_SIDEBAR_SHOW', () => {

    expect(reducer(initialState, {
      type: ACTIONS.RIGHT_SIDEBAR_SHOW
    })).toEqual({
      ...initialState,
      rightSidebar: true
    });
  });

  it('should handle RIGHT_SIDEBAR_HIDE', () => {

    expect(reducer(initialState, {
      type: ACTIONS.RIGHT_SIDEBAR_HIDE
    })).toEqual({
      ...initialState,
      rightSidebar: false
    });
  });

  it('should handle RESET', () => {

    expect(reducer(initialState, {
      type: ACTIONS.RESET
    })).toEqual({
      ...initialState
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
