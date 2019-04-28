import { all, put } from 'redux-saga/effects';
import { globalErrorAction } from '../actions/global.actions';
import sampleSagas from './sample.sagas';

export default function* rootSaga() {
  try {
    yield all([
      ...sampleSagas,
    ]);
  } catch (error) {
    // this should never happen, sagas should gracefully handle their own error
    yield put(globalErrorAction(error));
  }
}
