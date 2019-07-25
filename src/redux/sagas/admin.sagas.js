import * as firebase from 'firebase/app';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../actions/action.types';
import { globalLoadingAction } from '../actions/global.actions';
import {
  adminErrorAction,
  adminSubmitInProgressAction,
  adminViewScheduleAction,
  getGameDataAdminSuccessAction,
} from '../actions/admin.actions';
import { ADMIN_ERROR_TYPES } from '../reducers/admin.reducer';
import { message } from 'antd';
import {
  showAdminPickModalAction,
  showAdminTieBreakerModalAction,
  showAdminTieBreakerResultModalAction,
} from '../actions/modal.actions';
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
    const rawSchedule = yield call(fetchNflSchedule);
    const rawScheduleJson = yield rawSchedule.json();
    const parsedSchedule = yield parseNflSchedule(rawScheduleJson);
    yield put(adminViewScheduleAction(parsedSchedule));
  } catch (error) {
    console.error(error);
  }
}

function* createTieBreakerSaga(action) {
  try {
    const functions = firebase.functions();

    yield put(adminErrorAction(null));
    yield put(adminSubmitInProgressAction(true));

    const createTieBreakerFunction = yield call([functions, functions.httpsCallable], 'createTieBreaker');
    const gameData = yield call(createTieBreakerFunction, action.payload);

    yield fork(message.success, 'Tie Breaker Created');

    yield put(getGameDataAdminSuccessAction(gameData.data));

    yield put(adminSubmitInProgressAction(false));
    yield put(showAdminTieBreakerModalAction(false));
  } catch (error) {
    console.error(error);
    yield put(adminErrorAction(ADMIN_ERROR_TYPES.SUBMIT));
    yield put(adminSubmitInProgressAction(false));
  }
}

function* updateTieBreakerSaga(action) {
  try {
    const functions = firebase.functions();

    yield put(adminErrorAction(null));
    yield put(adminSubmitInProgressAction(true));

    const updateTieBreakerFunction = yield call([functions, functions.httpsCallable], 'updateTieBreaker');
    const gameData = yield call(updateTieBreakerFunction, action.payload);

    yield fork(message.success, 'Tie Breaker Updated');

    yield put(getGameDataAdminSuccessAction(gameData.data));

    yield put(adminSubmitInProgressAction(false));
    yield put(showAdminTieBreakerResultModalAction(false));
  } catch (error) {
    console.error(error);
    yield put(adminErrorAction(ADMIN_ERROR_TYPES.SUBMIT));
    yield put(adminSubmitInProgressAction(false));
  }
}

function* deleteTieBreakerSaga(action) {
  try {
    const functions = firebase.functions();

    yield put(adminErrorAction(null));
    yield put(adminSubmitInProgressAction(true));

    const deleteTieBreakerFunction = yield call([functions, functions.httpsCallable], 'deleteTieBreaker');
    const gameData = yield call(deleteTieBreakerFunction, action.payload);

    yield fork(message.success, 'Tie Breaker Deleted');

    yield put(getGameDataAdminSuccessAction(gameData.data));

    yield put(adminSubmitInProgressAction(false));
    yield put(showAdminTieBreakerResultModalAction(false));
  } catch (error) {
    console.error(error);
    yield put(adminErrorAction(ADMIN_ERROR_TYPES.SUBMIT));
    yield put(adminSubmitInProgressAction(false));
  }
}

function* postScheduleSaga(action) {
  try {
    const functions = firebase.functions();

    const setScheduleFunction = yield call([functions, functions.httpsCallable], 'setSchedule');
    yield call(setScheduleFunction, action.payload);

    yield fork(message.success, 'Schedule Posted');
  } catch (error) {
    console.error(error);
  }
}

function* sendEmailSaga(action) {
  try {
    const functions = firebase.functions();

    yield put(adminErrorAction(null));
    yield put(adminSubmitInProgressAction(true));

    const sendEmailFunction = yield call([functions, functions.httpsCallable], 'sendEmail');
    yield call(sendEmailFunction, action.payload.emailData);

    action.payload.onSuccess();

    yield fork(message.success, 'Email Sent');

    yield put(adminSubmitInProgressAction(false));
  } catch (error) {
    console.error(error);
    yield fork(message.error, 'Error: Email Not Sent');
    yield put(adminErrorAction(ADMIN_ERROR_TYPES.SUBMIT));
    yield put(adminSubmitInProgressAction(false));
  }
}

export default [
  takeLatest(ActionTypes.ADMIN.GET_GAME_DATA, getGameDataAdminSaga),
  takeLatest(ActionTypes.ADMIN.SUBMIT_PICK, submitPickAdminSaga),
  takeLatest(ActionTypes.ADMIN.GET_SCHEDULE, getScheduleSaga),
  takeLatest(ActionTypes.ADMIN.CREATE_TIE_BREAKER, createTieBreakerSaga),
  takeLatest(ActionTypes.ADMIN.UPDATE_TIE_BREAKER, updateTieBreakerSaga),
  takeLatest(ActionTypes.ADMIN.DELETE_TIE_BREAKER, deleteTieBreakerSaga),
  takeLatest(ActionTypes.ADMIN.POST_SCHEDULE, postScheduleSaga),
  takeLatest(ActionTypes.ADMIN.SEND_EMAIL, sendEmailSaga),
];
