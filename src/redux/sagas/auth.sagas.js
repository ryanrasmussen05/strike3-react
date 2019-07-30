import * as firebase from 'firebase/app';
import { call, fork, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../actions/action.types';
import { authErrorAction, authLoadingAction } from '../actions/auth.actions';
import { AUTH_ERROR_TYPES } from '../reducers/auth.reducer';
import { message } from 'antd';
import {
  showCreateAccountModalAction,
  showLoginModalAction,
  showResetPasswordModalAction,
} from '../actions/modal.actions';
import { getGameDataAction, getGameDataSuccessAction } from '../actions/game.actions';
import { getGameDataAdminAction } from '../actions/admin.actions';

function* signInSaga(action) {
  try {
    const auth = firebase.auth();

    yield put(authErrorAction(null));
    yield put(authLoadingAction(true));

    yield call([auth, auth.signInWithEmailAndPassword], action.payload.email, action.payload.password);

    yield put(showLoginModalAction(false));
    yield put(authLoadingAction(false));

    if (window.location.pathname.includes('admin')) {
      yield put(getGameDataAdminAction());
    } else {
      yield put(getGameDataAction());
    }
  } catch (error) {
    console.error(error);
    let errorType = AUTH_ERROR_TYPES.UNKNOWN;

    if (error.code === 'auth/user-not-found') {
      errorType = AUTH_ERROR_TYPES.USER_NOT_FOUND;
    }

    if (error.code === 'auth/wrong-password') {
      errorType = AUTH_ERROR_TYPES.WRONG_PASSWORD;
    }

    yield put(authErrorAction(errorType));
    yield put(authLoadingAction(false));
  }
}

function* signOutSaga() {
  try {
    const auth = firebase.auth();

    yield call([auth, auth.signOut]);

    if (window.location.pathname.includes('admin')) {
      window.location.href = '/player';
    } else {
      yield put(getGameDataAction());
      yield fork(message.info, 'You have signed out');
    }
  } catch (error) {
    console.error(error);
  }
}

function* createAccountSaga(action) {
  try {
    const auth = firebase.auth();
    const functions = firebase.functions();

    yield put(authErrorAction(null));
    yield put(authLoadingAction(true));

    // create user in firebase auth
    const userCredential = yield call([auth, auth.createUserWithEmailAndPassword], action.payload.email, action.payload.password);
    const user = userCredential.user;

    const capitalizedFirstName = action.payload.firstName.charAt(0).toUpperCase() + action.payload.firstName.slice(1);
    const capitalizedLastName = action.payload.lastName.charAt(0).toUpperCase() + action.payload.lastName.slice(1);
    const userDisplayName = `${ capitalizedFirstName } ${ capitalizedLastName }`;

    // set user display name
    yield call([user, user.updateProfile], { displayName: userDisplayName });

    // add user to strike3 database
    const createPlayerFunction = yield call([functions, functions.httpsCallable], 'createPlayer');
    const gameData = yield call(createPlayerFunction, { id: user.uid, name: userDisplayName, email: user.email });

    yield put(getGameDataSuccessAction(gameData.data));

    yield put(showCreateAccountModalAction(false));
    yield fork(message.success, 'Your account has been created');
    yield put(authLoadingAction(false));
  } catch (error) {
    console.error(error);
    let errorType = AUTH_ERROR_TYPES.UNKNOWN;

    if (error.code === 'auth/email-already-in-use') {
      errorType = AUTH_ERROR_TYPES.EMAIL_ALREADY_USED;
    }

    yield put(authErrorAction(errorType));
    yield put(authLoadingAction(false));
  }
}

function* resetPasswordSaga(action) {
  try {
    const auth = firebase.auth();

    yield put(authErrorAction(null));
    yield put(authLoadingAction(true));

    yield call([auth, auth.sendPasswordResetEmail], action.payload.email);

    yield put(showResetPasswordModalAction(false));
    yield fork(message.info, 'Instructions to reset your password have been sent to your email address', 10);
    yield put(authLoadingAction(false));
  } catch (error) {
    console.error(error);
    let errorType = AUTH_ERROR_TYPES.UNKNOWN;

    if (error.code === 'auth/user-not-found') {
      errorType = AUTH_ERROR_TYPES.USER_NOT_FOUND;
    }

    yield put(authErrorAction(errorType));
    yield put(authLoadingAction(false));
  }
}

export default [
  takeLatest(ActionTypes.AUTH.SIGN_IN, signInSaga),
  takeLatest(ActionTypes.AUTH.SIGN_OUT, signOutSaga),
  takeLatest(ActionTypes.AUTH.CREATE_ACCOUNT, createAccountSaga),
  takeLatest(ActionTypes.AUTH.RESET_PASSWORD, resetPasswordSaga),
];
