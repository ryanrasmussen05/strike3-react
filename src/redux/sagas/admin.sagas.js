import * as firebase from 'firebase/app';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../actions/action.types';
import { globalLoadingAction } from '../actions/global.actions';
import { adminErrorAction, getGameDataAdminSuccessAction } from '../actions/admin.actions';
import { ADMIN_ERROR_TYPES } from '../reducers/admin.reducer';

function* getGameDataAdminSaga() {
  try {
    const functions = firebase.functions();

    yield put(adminErrorAction(null));
    yield put(globalLoadingAction(true));

    const getGameDataAdminFunction = yield call([functions, functions.httpsCallable], 'getGameDataAdmin');
    const gameData = yield call(getGameDataAdminFunction);

    yield put(getGameDataAdminSuccessAction(gameData.data));
    yield put(globalLoadingAction(false));
  } catch (error) {
    console.error(error);
    yield put(adminErrorAction(ADMIN_ERROR_TYPES.GAME_DATA));
    yield put(globalLoadingAction(false));
  }
}

export default [
  takeLatest(ActionTypes.ADMIN.GET_GAME_DATA, getGameDataAdminSaga),
];
