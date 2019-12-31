import {
  RECEIVE_RECOMMENDATIONS
} from '../../actions/recommendation_actions';

export default function (state = {}, action) {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_RECOMMENDATIONS:
      return action.recommendations;
    default:
      return state;
  }
}