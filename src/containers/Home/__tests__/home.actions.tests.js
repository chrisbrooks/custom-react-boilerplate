import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';

import * as actions from '../home.actions';
import * as ACTIONS from '../home.actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('action creator tests', () => {

  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
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

  it('should return correct action for TOGGLE_LEFT_SIDEBAR', () => {
    const expectedAction = {
      type: ACTIONS.TOGGLE_LEFT_SIDEBAR
    };
    expect(actions.toggleLeftSidebar()).toEqual(expectedAction);
  });

});
