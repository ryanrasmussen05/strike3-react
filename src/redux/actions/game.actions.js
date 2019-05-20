import { ActionTypes } from './action.types';

export const getGameDataAction = () => ({
  type: ActionTypes.GAME.GET_GAME_DATA,
});

export const getGameDataSuccessAction = gameData => ({
  type: ActionTypes.GAME.GET_GAME_DATA_SUCCESS,
  payload: gameData,
});

export const setCurrentWeekAction = weekNumber => ({
  type: ActionTypes.GAME.SET_CURRENT_WEEK,
  payload: weekNumber,
});

export const setCurrentWeekSuccessAction = weekNumber => ({
  type: ActionTypes.GAME.SET_CURRENT_WEEK_SUCCESS,
  payload: weekNumber,
});

export const setSelectedWeekAction = weekNumber => ({
  type: ActionTypes.GAME.SET_SELECTED_WEEK,
  payload: weekNumber,
});

export const submitInProgressAction = isSubmitting => ({
  type: ActionTypes.GAME.SUBMIT_IN_PROGRESS,
  payload: isSubmitting,
});

export const gameErrorAction = error => ({
  type: ActionTypes.GAME.ERROR,
  payload: error,
});

export const submitPickPlayerAction = team => ({
  type: ActionTypes.GAME.SUBMIT_PICK_PLAYER,
  payload: team,
});

export const submitPickPlayerSuccessAction = pickDetails => ({
  type: ActionTypes.GAME.SUBMIT_PICK_PLAYER_SUCCESS,
  payload: pickDetails,
});
