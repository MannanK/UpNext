import {RECEIVE_INTERESTS, RECEIVE_NEW_INTEREST, REMOVE_INTEREST} from '../../actions/interest_actions';

const InterestsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);

  switch(action.type) {
    case RECEIVE_INTERESTS:
      newState = action.interests.data;
      return newState;
    case RECEIVE_NEW_INTEREST:
      newState[action.interest.data._id] = action.interest.data;
      return newState;
    case REMOVE_INTEREST:
      newState = action.interest.data;
      return newState;
    default:
      return state;
  }
};
export default InterestsReducer;