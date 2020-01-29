import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import loadingReducer from "./loading_reducer";

const uiReducer = combineReducers({
  modal: modalReducer,
  loading: loadingReducer
});

export default uiReducer;