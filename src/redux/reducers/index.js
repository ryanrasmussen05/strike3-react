import { combineReducers } from 'redux';
import auth from './auth.reducer';
import game from './game.reducer';
import global from './global.reducer';
import modal from './modal.reducer';

export default combineReducers({
  auth,
  game,
  global,
  modal,
});

