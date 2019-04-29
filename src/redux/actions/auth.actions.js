import { ActionTypes } from './action.types';

export const authLoadingAction = isLoading => ({
  type: ActionTypes.AUTH.LOADING,
  payload: isLoading,
});

export const authErrorAction = errorType => ({
  type: ActionTypes.AUTH.ERROR,
  payload: errorType,
});

export const setLoggedInUserAction = user => ({
  type: ActionTypes.AUTH.SET_LOGGED_IN_USER,
  payload: user,
});

export const createAccountAction = user => ({
  type: ActionTypes.AUTH.CREATE_ACCOUNT,
  payload: user,
});

export const signInAction = user => ({
  type: ActionTypes.AUTH.SIGN_IN,
  payload: user,
});

export const signOutAction = () => ({
  type: ActionTypes.AUTH.SIGN_OUT,
});

export const resetPasswordAction = user => ({
  type: ActionTypes.AUTH.RESET_PASSWORD,
  payload: user,
});
