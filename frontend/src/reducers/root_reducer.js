import { combineReducers } from 'redux';
// import session from './session_reducer';
import uiReducer from './ui/ui_reducer';

const RootReducer = combineReducers({
  ui: uiReducer,
  // session
});

export default RootReducer;