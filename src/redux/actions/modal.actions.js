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

export const showPickModalAction = shouldShow => ({
  type: ActionTypes.MODAL.SHOW_PICK_MODAL,
  payload: shouldShow,
});

export const showAdminPickModalAction = shouldShow => ({
  type: ActionTypes.MODAL.SHOW_ADMIN_PICK_MODAL,
  payload: shouldShow,
});

export const showAdminTieBreakerModalAction = shouldShow => ({
  type: ActionTypes.MODAL.SHOW_ADMIN_TIE_BREAKER_MODAL,
  payload: shouldShow,
});
