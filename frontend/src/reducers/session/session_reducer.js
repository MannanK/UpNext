import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN
 } from '../../actions/session_actions';

const initialState = {
  isAuthenticated: false,
  currentUser: {}
};

export default function (state = initialState, action) {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      let session = {
        isAuthenticated: !!action.currentUser,
        currentUser: action.currentUser
      };
      return Object.assign({}, state, session);
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        currentUser: {}
      };
    case RECEIVE_USER_SIGN_IN:
      return Object.assign({}, state, {isSignedIn: true});
    default:
      return state;
  }
}