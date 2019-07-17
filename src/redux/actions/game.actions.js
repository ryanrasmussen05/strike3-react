import { ActionTypes } from './action.types';

export const getGameDataAction = () => ({
  type: ActionTypes.GAME.GET_GAME_DATA,
});

export const getGameDataSuccessAction = gameData => ({
  type: ActionTypes.GAME.GET_GAME_DATA_SUCCESS,
  payload: gameData,
});

export const updateGameDataAction = gameData => ({
  type: ActionTypes.GAME.UPDATE_GAME_DATA,
  payload: gameData,
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

export const submitPickAction = team => ({
  type: ActionTypes.GAME.SUBMIT_PICK,
  payload: team,
});

export const submitTieBreakerPickAction = tieBreakerPick => ({
  type: ActionTypes.GAME.SUBMIT_TIE_BREAKER_PICK,
  payload: tieBreakerPick,
});
