import {
  RECEIVE_RECOMMENDATIONS,
  RECEIVE_SIMILAR_RECOMMENDATIONS
} from '../../actions/recommendation_actions';
import { RECEIVE_USER_LOGOUT } from '../../actions/session_actions';

const _initialState = {
  similar: {},
  other: {}
};

export default function (state = _initialState, action) {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_RECOMMENDATIONS:
      // this is a placeholder name for now
      newState.other = action.recommendations;
      return newState;
    case RECEIVE_SIMILAR_RECOMMENDATIONS:
      newState.similar = {};
      Object.values(action.recommendations).forEach(recommendation => {
        newState.similar[recommendation.movieId] = recommendation;
      });
      return newState;
    case RECEIVE_USER_LOGOUT:
      return _initialState;
    default:
      return state;
  }
}