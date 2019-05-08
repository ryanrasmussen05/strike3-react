import * as firebase from 'firebase/app';
import { call, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../actions/action.types';
import {
  gameErrorAction,
  getGameDataSuccessAction,
  setCurrentWeekSuccessAction,
  submitInProgressAction
} from '../actions/game.actions';
import { GAME_ERROR_TYPES } from '../reducers/game.reducer';
import { showPlayerPickModalAction } from '../actions/modal.actions';
import { globalLoadingAction } from '../actions/global.actions';
import { message } from 'antd';

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

function* submitPickPlayerSaga(action) {
  try {
    yield put(gameErrorAction(null));
    yield put(submitInProgressAction(true));

    console.log(action);
    yield delay(1000);
    // call the api here

    yield put(submitInProgressAction(false));
    yield put(showPlayerPickModalAction(false));
  } catch (error) {
    console.error(error);
    yield put(gameErrorAction(GAME_ERROR_TYPES.SUBMIT));
    yield put(submitInProgressAction(false));
  }
}

function* setCurrentWeekSaga(action) {
  try {
    const functions = firebase.functions();

    yield put(submitInProgressAction(true));

    const setWeekFunction = yield call([functions, functions.httpsCallable], 'setWeek');
    yield call(setWeekFunction, action.payload);

    yield put(setCurrentWeekSuccessAction(action.payload));

    yield fork(message.success, 'Week Saved');

    yield put(submitInProgressAction(false));
  } catch (error) {
    console.error(error);
    yield fork(message.error, 'An error occurred, week not saved');
    yield put(submitInProgressAction(false));
  }
}

export default [
  takeLatest(ActionTypes.GAME.GET_GAME_DATA, getGameDataSaga),
  takeLatest(ActionTypes.GAME.SUBMIT_PICK_PLAYER, submitPickPlayerSaga),
  takeLatest(ActionTypes.GAME.SET_CURRENT_WEEK, setCurrentWeekSaga),
];
