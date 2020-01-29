import {
  RECEIVE_SIMILAR_RECOMMENDATIONS,
  RECEIVE_ALL_RECOMMENDATIONS,
  START_LOADING_SIMILAR_RECOMMENDATIONS,
  START_LOADING_ALL_RECOMMENDATIONS,
  END_LOADING_ALL_RECOMMENDATIONS
} from "../../actions/recommendation_actions";


const initialState = {
  similarLoading: false,
  allLoading: false
};

export default (state = initialState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case START_LOADING_SIMILAR_RECOMMENDATIONS:
      return Object.assign({}, state, { similarLoading: true });
    case START_LOADING_ALL_RECOMMENDATIONS:
      return Object.assign({}, state, { allLoading: true });
    case RECEIVE_SIMILAR_RECOMMENDATIONS:
      return Object.assign({}, state, { similarLoading: false });
    // case RECEIVE_ALL_RECOMMENDATIONS:
    //   return Object.assign({}, state, { allLoading: false });
    case END_LOADING_ALL_RECOMMENDATIONS:
      return Object.assign({}, state, { allLoading: false });


    default:
      return state;
  }
};
