import reducers from '../toast.reducers';
import * as ACTIONS from '../toast.actionTypes';
import initialState from '../toast.initialState';
import { Type } from '../Toast';

describe('toast reducers tests', () => {

  it('should return initial state', () => {
    expect(reducers(initialState, {})).toEqual(initialState);
  });

  it('should handle SHOW_TOAST', () => {
    const payload = {
      type: Type.SUCCESS,
      message: 'User successfully saved',
    };
    expect(reducers(initialState, {
      type: ACTIONS.SHOW_TOAST,
      payload
    }))
    .toEqual({
      ...initialState,
      type: payload.type,
      message: payload.message,
      show: true
    });
  });

  it('should handle DISMISS_TOAST', () => {
    const shownState = {
      type: 'SUCCESS',
      message: 'User successfully saved',
      show: true
    };
    expect(reducers(shownState, {
      type: ACTIONS.DISMISS_TOAST
    }))
    .toEqual({
      ...shownState,
      show: false
    });
  });
});
