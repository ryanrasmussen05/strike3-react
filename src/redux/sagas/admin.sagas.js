import * as firebase from 'firebase/app';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../actions/action.types';
import { globalLoadingAction } from '../actions/global.actions';
import { adminErrorAction, adminSubmitInProgressAction, getGameDataAdminSuccessAction } from '../actions/admin.actions';
import { ADMIN_ERROR_TYPES } from '../reducers/admin.reducer';
import { message } from 'antd';
import { showAdminPickModalAction } from '../actions/modal.actions';
import { fetchNflSchedule, parseNflSchedule } from '../../api/nfl.service';

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

function* submitPickAdminSaga(action) {
  try {
    const functions = firebase.functions();

    yield put(adminErrorAction(null));
    yield put(adminSubmitInProgressAction(true));

    const setPickAdminFunction = yield call([functions, functions.httpsCallable], 'setPickAdmin');
    const gameData = yield call(setPickAdminFunction, action.payload);

    yield fork(message.success, 'Pick Submitted');

    yield put(getGameDataAdminSuccessAction(gameData.data));

    yield put(adminSubmitInProgressAction(false));
    yield put(showAdminPickModalAction(false));
  } catch (error) {
    console.error(error);

    if (error.code === 'already-exists') {
      yield put(adminErrorAction(ADMIN_ERROR_TYPES.DUPLICATE_PICK));
    } else {
      yield put(adminErrorAction(ADMIN_ERROR_TYPES.SUBMIT));
    }

    yield put(adminSubmitInProgressAction(false));
  }
}

function* getScheduleSaga() {
  try {
    const functions = firebase.functions();

    const rawSchedule = yield call(fetchNflSchedule);
    const rawScheduleJson = yield rawSchedule.json();
    const parsedSchedule = yield parseNflSchedule(rawScheduleJson);
    console.log(parsedSchedule);

    // TODO don't do this immediately, have another action, put in state first to view
    const setScheduleFunction = yield call([functions, functions.httpsCallable], 'setSchedule');
    yield call(setScheduleFunction, parsedSchedule);
  } catch (error) {
    console.error(error);
  }
}

export default [
  takeLatest(ActionTypes.ADMIN.GET_GAME_DATA, getGameDataAdminSaga),
  takeLatest(ActionTypes.ADMIN.SUBMIT_PICK, submitPickAdminSaga),
  takeLatest(ActionTypes.ADMIN.GET_SCHEDULE, getScheduleSaga),
];
