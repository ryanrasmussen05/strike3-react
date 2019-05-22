import { ActionTypes } from './action.types';

export const getGameDataAdminAction = () => ({
  type: ActionTypes.ADMIN.GET_GAME_DATA,
});

export const getGameDataAdminSuccessAction = gameData => ({
  type: ActionTypes.ADMIN.GET_GAME_DATA_SUCCESS,
  payload: gameData,
});

export const adminSubmitInProgressAction = isSubmitting => ({
  type: ActionTypes.ADMIN.SUBMIT_IN_PROGRESS,
  payload: isSubmitting,
});

export const adminErrorAction = error => ({
  type: ActionTypes.ADMIN.ERROR,
  payload: error,
});