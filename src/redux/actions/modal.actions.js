import { ActionTypes } from './action.types';

export const showLoginModalAction = shouldShow => ({
  type: ActionTypes.MODAL.SHOW_LOGIN_MODAL,
  payload: shouldShow,
});

export const showCreateAccountModalAction = shouldShow => ({
  type: ActionTypes.MODAL.SHOW_CREATE_ACCOUNT_MODAL,
  payload: shouldShow,
});

export const showResetPasswordModalAction = shouldShow => ({
  type: ActionTypes.MODAL.SHOW_RESET_PASSWORD_MODAL,
  payload: shouldShow,
});

export const showPlayerPickModalAction = shouldShow => ({
  type: ActionTypes.MODAL.SHOW_PLAYER_PICK_MODAL,
  payload: shouldShow,
});
