import * as firebase from 'firebase/app';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../actions/action.types';
import { gameErrorAction, setGameDataAction, submitInProgressAction } from '../actions/game.actions';
import { GAME_ERROR_TYPES } from '../reducers/game.reducer';
import { showPlayerPickModalAction } from '../actions/modal.actions';
import { globalLoadingAction } from '../actions/global.actions';

function* getGameDataSaga() {
  try {
    const functions = firebase.functions();

    yield put(gameErrorAction(null));
    yield put(globalLoadingAction(true));

    const getGameDataFunction = yield call([functions, functions.httpsCallable], 'getGameData');
    const gameData = yield call(getGameDataFunction);

    yield put(setGameDataAction(gameData.data));
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

export default [
  takeLatest(ActionTypes.GAME.GET_GAME_DATA, getGameDataSaga),
  takeLatest(ActionTypes.GAME.SUBMIT_PICK_PLAYER, submitPickPlayerSaga),
];
