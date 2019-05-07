import { ActionTypes } from '../actions/action.types';
import _ from 'lodash';

const INITIAL_STATE = {
  selectedWeek: 1,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GAME.SET_SELECTED_WEEK: {
      const newState = _.cloneDeep(state);
      newState.selectedWeek = action.payload;
      return newState;
    }

    default:
      return state;
  }
};
