import { RECEIVE_GENRES, RECEIVE_GENRE } from '../../actions/genre_actions';
import { RECEIVE_USER_LOGOUT } from '../../actions/session_actions';

const GenresReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_GENRES:
      action.genres.data.forEach((genre, idx) => {
        newState[action.genres.data[idx].id] = genre;
      });
      return newState;
    case RECEIVE_GENRE:
      newState[action.genre.data.id] = action.genre.data;
      return newState;
    case RECEIVE_USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export default GenresReducer;