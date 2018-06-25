import * as actions from '../toast.actions';
import * as ACTION_TYPES from '../toast.actionTypes';
import { Type } from '../Toast';

describe('toast action creator tests', () => {

  it('should create SHOW_TOAST action', () => {
    expect(actions.showToast(Type.DANGER, 'Network Error', 'Users screen'))
    .toEqual({
      type: ACTION_TYPES.SHOW_TOAST,
      payload: {
        type: Type.DANGER,
        message: 'Network Error'
      }
    });
  });

  it('should create DISMISS_TOAST action', () => {
    expect(actions.dismissToast())
    .toEqual({
      type: ACTION_TYPES.DISMISS_TOAST
    });
  });
});
