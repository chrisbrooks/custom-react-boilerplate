import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import network from 'utils/network';
import * as actions from '../app.actions';
import * as ACTIONS from '../app.actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('action creator tests', () => {

  beforeEach(() => {
    moxios.install(network);
  });

  afterEach(() => {
    moxios.uninstall(network);
  });

  it('should call the correct actions for getUserLocation', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          country: 'AU'
        },
      });
    });

    const expectedActions = [
      {
        type: ACTIONS.GET_USER_LOCATION_SUCCESS,
        payload: {
          country: 'AU'
        }
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getUserLocation()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should call the correct actions for getUserLocation', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {
          country: 'AU'
        },
      });
    });

    const expectedActions = [
      {
        type: ACTIONS.GET_USER_LOCATION_FAILURE,
        payload: {
          country: 'AU'
        }
      }
    ];

    const store = mockStore({});
    return store.dispatch(actions.getUserLocation()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should return correct action for LEFT_SIDEBAR_SHOW', () => {
    const expectedAction = {
      type: ACTIONS.LEFT_SIDEBAR_SHOW
    };
    expect(actions.toggleLeftShow()).toEqual(expectedAction);
  });

  it('should return correct action for LEFT_SIDEBAR_HIDE', () => {
    const expectedAction = {
      type: ACTIONS.LEFT_SIDEBAR_HIDE
    };
    expect(actions.toggleLeftHide()).toEqual(expectedAction);
  });

  it('should return correct action for RIGHT_SIDEBAR_SHOW', () => {
    const expectedAction = {
      type: ACTIONS.RIGHT_SIDEBAR_SHOW
    };
    expect(actions.toggleRightShow()).toEqual(expectedAction);
  });

  it('should return correct action for RIGHT_SIDEBAR_HIDE', () => {
    const expectedAction = {
      type: ACTIONS.RIGHT_SIDEBAR_HIDE
    };
    expect(actions.toggleRightHide()).toEqual(expectedAction);
  });

  it('should return correct action for RESET', () => {
    const expectedAction = {
      type: ACTIONS.RESET
    };
    expect(actions.reset()).toEqual(expectedAction);
  });

});
