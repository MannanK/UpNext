import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT } from '../../actions/session_actions';


const initialState = {
  isAuthenticated: false,
  user: {}
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
        currentUser: undefined
      };
    default:
      return state;
  }
}