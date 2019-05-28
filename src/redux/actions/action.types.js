export const ActionTypes = {
  GLOBAL: {
    LOADING: 'GLOBAL_LOADING',
    ERROR: 'GLOBAL_ERROR',
  },
  MODAL: {
    SHOW_LOGIN_MODAL: 'SHOW_LOGIN_MODAL',
    SHOW_CREATE_ACCOUNT_MODAL: 'SHOW_CREATE_ACCOUNT_MODAL',
    SHOW_RESET_PASSWORD_MODAL: 'SHOW_RESET_PASSWORD_MODAL',
    SHOW_PICK_MODAL: 'SHOW_PICK_MODAL',
    SHOW_ADMIN_PICK_MODAL: 'SHOW_ADMIN_PICK_MODAL',
  },
  AUTH: {
    LOADING: 'AUTH_LOADING',
    ERROR: 'AUTH_ERROR',
    SET_LOGGED_IN_USER: 'SET_LOGGED_IN_USER',
    CREATE_ACCOUNT: 'CREATE_ACCOUNT',
    SIGN_IN: 'SIGN_IN',
    SIGN_OUT: 'SIGN_OUT',
    RESET_PASSWORD: 'RESET_PASSWORD',
  },
  GAME: {
    GET_GAME_DATA: 'GAME_GET_GAME_DATA',
    GET_GAME_DATA_SUCCESS: 'GAME_GET_GAME_DATA_SUCCESS',
    UPDATE_GAME_DATA: 'GAME_UPDATE_GAME_DATA',
    SUBMIT_PICK: 'GAME_SUBMIT_PICK',
    SET_SELECTED_WEEK: 'GAME_SET_SELECTED_WEEK',
    SUBMIT_IN_PROGRESS: 'GAME_SUBMIT_IN_PROGRESS',
    ERROR: 'GAME_ERROR',
  },
  ADMIN: {
    GET_GAME_DATA: 'ADMIN_GET_GAME_DATA',
    GET_GAME_DATA_SUCCESS: 'ADMIN_GET_GAME_DATA_SUCCESS',
    SET_SELECTED_PICK: 'ADMIN_SET_SELECTED_PICK',
    SET_SELECTED_PLAYER: 'ADMIN_SET_SELECTED_PLAYER',
    SUBMIT_PICK: 'ADMIN_SUBMIT_PICK',
    GET_SCHEDULE: 'ADMIN_GET_SCHEDULE',
    SUBMIT_IN_PROGRESS: 'ADMIN_SUBMIT_IN_PROGRESS',
    ERROR: 'ADMIN_ERROR',
  },
};
