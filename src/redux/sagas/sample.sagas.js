import { delay, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../actions/action.types';

function* sampleSaga() {
  try {
    console.log('setting delay');
    yield delay(1000);
    console.log('finished delay');
  } catch (error) {
    console.log(error);
  }
}

export default [
  takeLatest(ActionTypes.SAMPLE.SAMPLE_SAGA_ACTION, sampleSaga),
];
