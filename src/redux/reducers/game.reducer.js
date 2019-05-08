import { ActionTypes } from '../actions/action.types';
import _ from 'lodash';

export const GAME_ERROR_TYPES = {
  SUBMIT: 'game_error_submit',
  GAME_DATA: 'game_error_game_data',
};

const INITIAL_STATE = {
  gameData: null,
  selectedWeek: 1,
  submitInProgress: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GAME.SET_GAME_DATA: {
      const newState = _.cloneDeep(state);
      newState.gameData = action.payload;
      return newState;
    }

    case ActionTypes.GAME.SET_SELECTED_WEEK: {
      const newState = _.cloneDeep(state);
      newState.selectedWeek = action.payload;
      return newState;
    }

    case ActionTypes.GAME.SUBMIT_IN_PROGRESS: {
      const newState = _.cloneDeep(state);
      newState.submitInProgress = action.payload;
      return newState;
    }

    case ActionTypes.GAME.ERROR: {
      const newState = _.cloneDeep(state);
      newState.error = action.payload;
      return newState;
    }

    default:
      return state;
  }
};
