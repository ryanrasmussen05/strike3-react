import * as firebase from 'firebase/app';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../actions/action.types';
import { authErrorAction, authLoadingAction } from '../actions/auth.actions';
import { AUTH_ERROR_TYPES } from '../reducers/auth.reducer';
import { message } from 'antd';
import { showCreateAccountModalAction } from '../actions/modal.actions';

function* signOutSaga() {
  try {
    const auth = firebase.auth();

    yield call([auth, auth.signOut]);
    yield call(message.success, 'You have signed out');
  } catch (error) {
    console.error(error);
  }
}

function* createAccountSaga(action) {
  try {
    const auth = firebase.auth();

    yield put(authErrorAction(null));
    yield put(authLoadingAction(true));

    const userCredential = yield call([auth, auth.createUserWithEmailAndPassword], action.payload.email, action.payload.password);
    const user = userCredential.user;

    const capitalizedFirstName = action.payload.firstName.charAt(0).toUpperCase() + action.payload.firstName.slice(1);
    const capitalizedLastName = action.payload.lastName.charAt(0).toUpperCase() + action.payload.lastName.slice(1);
    const userDisplayName = `${capitalizedFirstName} ${capitalizedLastName}`;

    yield call([user, user.updateProfile], { displayName: userDisplayName });

    yield put(showCreateAccountModalAction(false));
    yield call(message.success, 'Your account has been created');
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

export default [
  takeLatest(ActionTypes.AUTH.SIGN_OUT, signOutSaga),
  takeLatest(ActionTypes.AUTH.CREATE_ACCOUNT, createAccountSaga),
];
