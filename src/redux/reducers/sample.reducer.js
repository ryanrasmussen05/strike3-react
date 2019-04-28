import { ActionTypes } from '../actions/action.types';
import _ from 'lodash';

const INITIAL_STATE = {
  sampleText: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SAMPLE.SAMPLE_ACTION: {
      const newState = _.cloneDeep(state);
      newState.sampleText = action.payload;
      return newState;
    }

    default:
      return state;
  }
};
