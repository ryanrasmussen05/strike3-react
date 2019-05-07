import { delay, put, takeLatest } from 'redux-saga/effects';
import { ActionTypes } from '../actions/action.types';
import { gameErrorAction, submitInProgressAction } from '../actions/game.actions';
import { GAME_ERROR_TYPES } from '../reducers/game.reducer';
import { showPlayerPickModalAction } from '../actions/modal.actions';

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
  takeLatest(ActionTypes.GAME.SUBMIT_PICK_PLAYER, submitPickPlayerSaga),
];
