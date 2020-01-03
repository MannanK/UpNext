import {
  RECEIVE_RECOMMENDATIONS,
  RECEIVE_SIMILAR_RECOMMENDATIONS
} from '../../actions/recommendation_actions';

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
      Object.values(action.recommendations).forEach(recommendation => {
        newState.similar[recommendation._id] = recommendation;
      });
      return newState;
    default:
      return state;
  }
}