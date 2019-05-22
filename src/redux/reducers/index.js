import { combineReducers } from 'redux';
import admin from './admin.reducer';
import auth from './auth.reducer';
import game from './game.reducer';
import global from './global.reducer';
import modal from './modal.reducer';

export default combineReducers({
  admin,
  auth,
  game,
  global,
  modal,
});

