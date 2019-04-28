import { ActionTypes } from './action.types';

export const showLoginModalAction = shouldShow => ({
  type: ActionTypes.MODAL.SHOW_LOGIN_MODAL,
  payload: shouldShow,
});
