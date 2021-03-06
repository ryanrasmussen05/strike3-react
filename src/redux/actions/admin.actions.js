import { ActionTypes } from './action.types';

export const getGameDataAdminAction = () => ({
  type: ActionTypes.ADMIN.GET_GAME_DATA,
});

export const getGameDataAdminSuccessAction = gameData => ({
  type: ActionTypes.ADMIN.GET_GAME_DATA_SUCCESS,
  payload: gameData,
});

export const adminSetSelectedPickAction = pick => ({
  type: ActionTypes.ADMIN.SET_SELECTED_PICK,
  payload: pick,
});

export const adminSetSelectedPlayerAction = player => ({
  type: ActionTypes.ADMIN.SET_SELECTED_PLAYER,
  payload: player,
});

export const adminSubmitPickAction = pick => ({
  type: ActionTypes.ADMIN.SUBMIT_PICK,
  payload: pick,
});

export const adminGetScheduleAction = () => ({
  type: ActionTypes.ADMIN.GET_SCHEDULE,
});

export const adminViewScheduleAction = schedule => ({
  type: ActionTypes.ADMIN.VIEW_SCHEDULE,
  payload: schedule,
});

export const adminPostScheduleAction = schedule => ({
  type: ActionTypes.ADMIN.POST_SCHEDULE,
  payload: schedule,
});

export const adminCreateTieBreakerAction = tieBreaker => ({
  type: ActionTypes.ADMIN.CREATE_TIE_BREAKER,
  payload: tieBreaker,
});

export const adminUpdateTieBreakerAction = tieBreaker => ({
  type: ActionTypes.ADMIN.UPDATE_TIE_BREAKER,
  payload: tieBreaker,
});

export const adminDeleteTieBreakerAction = tieBreaker => ({
  type: ActionTypes.ADMIN.DELETE_TIE_BREAKER,
  payload: tieBreaker,
});

export const adminSetSelectedTieBreakerAction = tieBreaker => ({
  type: ActionTypes.ADMIN.SET_SELECTED_TIE_BREAKER,
  payload: tieBreaker,
});

export const adminSendEmailAction = emailData => ({
  type: ActionTypes.ADMIN.SEND_EMAIL,
  payload: emailData,
});

export const adminSubmitInProgressAction = isSubmitting => ({
  type: ActionTypes.ADMIN.SUBMIT_IN_PROGRESS,
  payload: isSubmitting,
});

export const adminErrorAction = error => ({
  type: ActionTypes.ADMIN.ERROR,
  payload: error,
});
