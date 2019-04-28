import { combineReducers } from 'redux';
import modal from './modal.reducer';
import sample from './sample.reducer';

export default combineReducers({
  modal,
  sample,
});

