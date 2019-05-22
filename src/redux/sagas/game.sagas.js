import * as firebase from 'firebase/app';
import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../actions/action.types';
import {
  gameErrorAction,
  getGameDataSuccessAction,
  submitInProgressAction,
  submitPickSuccessAction,
} from '../actions/game.actions';
import { GAME_ERROR_TYPES } from '../reducers/game.reducer';
import { showPickModalAction } from '../actions/modal.actions';
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
    yield call(setPickFunction, payload);

    yield fork(message.success, 'Pick Submitted');

    yield put(submitPickSuccessAction({ userId, week, team }));

    yield put(submitInProgressAction(false));
    yield put(showPickModalAction(false));
  } catch (error) {
    console.error(error);

    // TODO eventually add error type for week locked / game started
    if (error.code === 'already-exists') {
      yield put(gameErrorAction(GAME_ERROR_TYPES.DUPLICATE_PICK));
    } else {
      yield put(gameErrorAction(GAME_ERROR_TYPES.SUBMIT));
    }

    yield put(submitInProgressAction(false));
  }
}

export default [
  takeLatest(ActionTypes.GAME.GET_GAME_DATA, getGameDataSaga),
  takeLatest(ActionTypes.GAME.SUBMIT_PICK, submitPickSaga),
];
