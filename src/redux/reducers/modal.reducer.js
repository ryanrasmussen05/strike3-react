import { ActionTypes } from '../actions/action.types';
import _ from 'lodash';

const INITIAL_STATE = {
  showLoginModal: false,
  showCreateAccountModal: false,
  showResetPasswordModal: false,
  showPickModal: false,
  showTieBreakerPickModal: false,
  showAdminPickModal: false,
  showAdminTieBreakerModal: false,
  showAdminTieBreakerResultModal: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.MODAL.SHOW_LOGIN_MODAL: {
      const newState = _.cloneDeep(state);
      newState.showLoginModal = action.payload;
      return newState;
    }

    case ActionTypes.MODAL.SHOW_CREATE_ACCOUNT_MODAL: {
      const newState = _.cloneDeep(state);
      newState.showCreateAccountModal = action.payload;
      return newState;
    }

    case ActionTypes.MODAL.SHOW_RESET_PASSWORD_MODAL: {
      const newState = _.cloneDeep(state);
      newState.showResetPasswordModal = action.payload;
      return newState;
    }

    case ActionTypes.MODAL.SHOW_PICK_MODAL: {
      const newState = _.cloneDeep(state);
      newState.showPickModal = action.payload;
      return newState;
    }

    case ActionTypes.MODAL.SHOW_TIE_BREAKER_PICK_MODAL: {
      const newState = _.cloneDeep(state);
      newState.showTieBreakerPickModal = action.payload;
      return newState;
    }

    case ActionTypes.MODAL.SHOW_ADMIN_PICK_MODAL: {
      const newState = _.cloneDeep(state);
      newState.showAdminPickModal = action.payload;
      return newState;
    }

    case ActionTypes.MODAL.SHOW_ADMIN_TIE_BREAKER_MODAL: {
      const newState = _.cloneDeep(state);
      newState.showAdminTieBreakerModal = action.payload;
      return newState;
    }

    case ActionTypes.MODAL.SHOW_ADMIN_TIE_BREAKER_RESULT_MODAL: {
      const newState = _.cloneDeep(state);
      newState.showAdminTieBreakerResultModal = action.payload;
      return newState;
    }

    default:
      return state;
  }
};
