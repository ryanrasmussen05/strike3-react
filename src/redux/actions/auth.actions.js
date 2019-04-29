import { ActionTypes } from './action.types';

export const authLoadingAction = isLoading => ({
  type: ActionTypes.AUTH.LOADING,
  payload: isLoading,
});

export const authErrorAction = errorType => ({
  type: ActionTypes.AUTH.ERROR,
  payload: errorType,
});

export const createAccountAction = user => ({
  type: ActionTypes.AUTH.CREATE_ACCOUNT,
  payload: user,
});
