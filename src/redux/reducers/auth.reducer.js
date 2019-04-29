import { ActionTypes } from '../actions/action.types';
import _ from 'lodash';

export const AUTH_ERROR_TYPES = {
  UNKNOWN: 'auth_error_generic',
  EMAIL_ALREADY_USED: 'auth_error_email_used',
};

const INITIAL_STATE = {
  loading: false,
  loggedInUser: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.AUTH.LOADING: {
      const newState = _.cloneDeep(state);
      newState.loading = action.payload;
      return newState;
    }

    case ActionTypes.AUTH.ERROR: {
      const newState = _.cloneDeep(state);
      newState.error = action.payload;
      return newState;
    }

    case ActionTypes.AUTH.SET_LOGGED_IN_USER: {
      const newState = _.cloneDeep(state);
      newState.loggedInUser = action.payload;
      return newState;
    }

    default:
      return state;
  }
};
