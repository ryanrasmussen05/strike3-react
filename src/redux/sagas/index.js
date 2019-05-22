import { all, put } from 'redux-saga/effects';
import { globalErrorAction } from '../actions/global.actions';
import adminSagas from './admin.sagas';
import authSagas from './auth.sagas';
import gameSagas from './game.sagas';

export default function* rootSaga() {
  try {
    yield all([
      ...adminSagas,
      ...authSagas,
      ...gameSagas,
    ]);
  } catch (error) {
    // this should never happen, sagas should gracefully handle their own error
    yield put(globalErrorAction(error));
  }
}
