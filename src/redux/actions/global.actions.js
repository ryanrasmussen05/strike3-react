import { ActionTypes } from './action.types';

export const globalErrorAction = error => ({
  type: ActionTypes.GLOBAL.ERROR,
  payload: error,
});
