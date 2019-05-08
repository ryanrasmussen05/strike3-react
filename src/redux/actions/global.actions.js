import { ActionTypes } from './action.types';

export const globalLoadingAction = isLoading => ({
  type: ActionTypes.GLOBAL.LOADING,
  payload: isLoading,
});

export const globalErrorAction = error => ({
  type: ActionTypes.GLOBAL.ERROR,
  payload: error,
});
