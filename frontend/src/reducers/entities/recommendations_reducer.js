import {
  RECEIVE_RECOMMENDATIONS,
  RECEIVE_SIMILAR_RECOMMENDATIONS
} from '../../actions/recommendation_actions';

export default function (state = {}, action) {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch (action.type) {
    case RECEIVE_RECOMMENDATIONS:
      // this is a placeholder name for now
      newState.other = action.recommendations;
      return newState;
    case RECEIVE_SIMILAR_RECOMMENDATIONS:
      newState.similar = action.recommendations;
      return newState;
    default:
      return state;
  }
}