import { combineReducers } from 'redux';
import sessionReducer from './session/session_reducer';
import errorsReducer from './errors/errors_reducer';

const RootReducer = combineReducers({
  session: sessionReducer,
  errors: errorsReducer
});

export default RootReducer;