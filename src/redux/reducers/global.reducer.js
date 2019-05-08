import { ActionTypes } from '../actions/action.types';
import _ from 'lodash';

const INITIAL_STATE = {
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GLOBAL.LOADING: {
      const newState = _.cloneDeep(state);
      newState.loading = action.payload;
      return newState;
    }

    case ActionTypes.GLOBAL.ERROR: {
      const newState = _.cloneDeep(state);
      newState.error = action.payload;
      return newState;
    }

    default:
      return state;
  }
};
