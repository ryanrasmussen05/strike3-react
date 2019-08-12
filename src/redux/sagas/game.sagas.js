import * as firebase from 'firebase/app';
import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../actions/action.types';
import {
  gameErrorAction,
  getGameDataSuccessAction,
  submitInProgressAction,
  updateGameDataAction,
} from '../actions/game.actions';
import { GAME_ERROR_TYPES } from '../reducers/game.reducer';
import { showPickModalAction, showTieBreakerPickModalAction } from '../actions/modal.actions';
import { globalLoadingAction } from '../actions/global.actions';
import { message } from 'antd';
import { selectSelectedWeek } from '../selectors/game.selectors';
import { selectLoggedInUserId } from '../selectors/auth.selectors';

function* getGameDataSaga() {
  try {
    const functions = firebase.functions();

    yield put(gameErrorAction(null));
    yield put(globalLoadingAction(true));

    const getGameDataFunction = yield call([functions, functions.httpsCallable], 'getGameData');
    const gameData = yield call(getGameDataFunction);

    yield put(getGameDataSuccessAction(gameData.data));
    yield put(globalLoadingAction(false));
  } catch (error) {
    console.error(error);
    yield put(gameErrorAction(GAME_ERROR_TYPES.GAME_DATA));
    yield put(globalLoadingAction(false));
  }
}

function* submitPickSaga(action) {
  try {
    const functions = firebase.functions();

    yield put(gameErrorAction(null));
    yield put(submitInProgressAction(true));

    const week = yield select(selectSelectedWeek);
    const userId = yield select(selectLoggedInUserId);
    const team = action.payload;
    const payload = { week, userId, team };

    const setPickFunction = yield call([functions, functions.httpsCallable], 'setPick');
    const gameData = yield call(setPickFunction, payload);

    yield fork(message.success, 'Pick Submitted');

    yield put(updateGameDataAction(gameData.data));

    yield put(submitInProgressAction(false));
    yield put(showPickModalAction(false));
  } catch (error) {
    console.error(error);

    if (error.code === 'already-exists') {
      yield put(gameErrorAction(GAME_ERROR_TYPES.DUPLICATE_PICK));
    } else if (error.code === 'out-of-range' && error.message === 'new pick game started') {
      yield put(gameErrorAction(GAME_ERROR_TYPES.NEW_PICK_STARTED));
    } else if (error.message === 'existing pick game started') {
      yield put(gameErrorAction(GAME_ERROR_TYPES.EXISTING_PICK_STARTED));
    } else if (error.message === 'deadline for week has past') {
      yield put(gameErrorAction(GAME_ERROR_TYPES.DEADLINE_PASSED));
    } else {
      yield put(gameErrorAction(GAME_ERROR_TYPES.SUBMIT));
    }

    yield put(submitInProgressAction(false));
  }
}

function* submitTieBreakerPickSaga(action) {
  try {
    const functions = firebase.functions();

    yield put(gameErrorAction(null));
    yield put(submitInProgressAction(true));

    const week = yield select(selectSelectedWeek);
    const userId = yield select(selectLoggedInUserId);
    const tieBreakerAwayTeamPoints = action.payload.tieBreakerAwayTeamPoints;
    const tieBreakerHomeTeamPoints = action.payload.tieBreakerHomeTeamPoints;
    const payload = { week, userId, tieBreakerAwayTeamPoints, tieBreakerHomeTeamPoints };

    const setTieBreakerPickFunction = yield call([functions, functions.httpsCallable], 'setTieBreakerPick');
    const gameData = yield call(setTieBreakerPickFunction, payload);

    yield fork(message.success, 'Tie Breaker Submitted');

    yield put(updateGameDataAction(gameData.data));

    yield put(submitInProgressAction(false));
    yield put(showTieBreakerPickModalAction(false));
  } catch (error) {
    console.error(error);

    if (error.code === 'out-of-range') {
      yield put(gameErrorAction(GAME_ERROR_TYPES.TIE_BREAKER_STARTED));
    } else if (error.message === 'deadline for week has past') {
      yield put(gameErrorAction(GAME_ERROR_TYPES.DEADLINE_PASSED));
    } else {
      yield put(gameErrorAction(GAME_ERROR_TYPES.SUBMIT));
    }

    yield put(submitInProgressAction(false));
  }
}

export default [
  takeLatest(ActionTypes.GAME.GET_GAME_DATA, getGameDataSaga),
  takeLatest(ActionTypes.GAME.SUBMIT_PICK, submitPickSaga),
  takeLatest(ActionTypes.GAME.SUBMIT_TIE_BREAKER_PICK, submitTieBreakerPickSaga),
];
