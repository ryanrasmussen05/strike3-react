import { ActionTypes } from '../actions/action.types';
import _ from 'lodash';

export const ADMIN_ERROR_TYPES = {
  SUBMIT: 'admin_error_submit',
  GAME_DATA: 'admin_error_game_data',
  DUPLICATE_PICK: 'admin_duplicate_pick',
};

const INITIAL_STATE = {
  gameData: null,
  selectedPick: null,
  selectedPlayer: null,
  submitInProgress: false,
  schedulePreview: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADMIN.GET_GAME_DATA_SUCCESS: {
      const newState = _.cloneDeep(state);
      newState.gameData = action.payload;
      return newState;
    }

    case ActionTypes.ADMIN.SUBMIT_IN_PROGRESS: {
      const newState = _.cloneDeep(state);
      newState.submitInProgress = action.payload;
      return newState;
    }

    case ActionTypes.ADMIN.SET_SELECTED_PLAYER: {
      const newState = _.cloneDeep(state);
      newState.selectedPlayer = action.payload;
      return newState;
    }

    case ActionTypes.ADMIN.SET_SELECTED_PICK: {
      const newState = _.cloneDeep(state);
      newState.selectedPick = action.payload;
      return newState;
    }

    case ActionTypes.ADMIN.VIEW_SCHEDULE: {
      const newState = _.cloneDeep(state);
      newState.schedulePreview = action.payload;
      return newState;
    }

    case ActionTypes.ADMIN.ERROR: {
      const newState = _.cloneDeep(state);
      newState.error = action.payload;
      return newState;
    }

    default:
      return state;
  }
};
