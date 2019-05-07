import { ActionTypes } from './action.types';

export const setSelectedWeekAction = weekNumber => ({
  type: ActionTypes.GAME.SET_SELECTED_WEEK,
  payload: weekNumber,
});
