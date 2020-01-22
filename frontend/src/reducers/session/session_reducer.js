import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_LOGOUT,
  RECEIVE_USER_SIGN_IN,
  UPDATE_PREFERENCES
 } from '../../actions/session_actions';

const initialState = {
  isAuthenticated: false,
  currentUser: {}
};
const PREFERENCE_THRESHOLD = { 
  HIGH: 0.5,
  LOW: 0.25
};

const preferenceRank = (state) => {
  let preferences = {
    high: [],
    medium: []
  };
    const {genres} = state.entities;
    const totalInterests = Object.keys(state.entities.interests).length;
    Object.keys(genres).forEach(genre=>{

      const rank = genre.count / totalInterests;
      if ( rank >= PREFERENCE_THRESHOLD.HIGH ) {
        preferences.high.push(genre.name);
      } else if (rank >= PREFERENCE_THRESHOLD.LOW ) {
        preferences.medium.push(genre.name);
      }
    });
  return {preferences};
}

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
    // case UPDATE_PREFERENCES:
    //   const genrePreferences = preferenceRank(state);

    //   return Object.assign({}, state, genrePreferences);
    default:
      return state;
  }
}

