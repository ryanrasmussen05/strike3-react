import { ActionTypes } from './action.types';

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
