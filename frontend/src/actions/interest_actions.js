import * as InterestApiUtil from '../util/interest_api_util';
import {startLoadingAll, endLoadingAll} from "./recommendation_actions";

export const RECEIVE_INTERESTS = "RECEIVE_INTERESTS";
export const RECEIVE_NEW_INTEREST = "RECEIVE_NEW_INTEREST";
export const REMOVE_INTEREST = "REMOVE_INTEREST";


export const receiveInterests = interests => ({
  type: RECEIVE_INTERESTS,
  interests
});

export const receiveNewInterest = interest => ({
  type: RECEIVE_NEW_INTEREST,
  interest
});

export const removeInterest = interestId => ({
  type: REMOVE_INTEREST,
  interestId
});

export const fetchInterests = () => dispatch => (
  InterestApiUtil.getInterests()
    .then(interests => dispatch(receiveInterests(interests)))
    .catch(err => console.log(err))  
);

export const createInterest = data => dispatch => {
  // dispatch(startLoadingAll());
  // setTimeout(() => {
  //   dispatch(endLoadingAll());
  // }, 1500);

  return InterestApiUtil.addInterest(data)
  .then(interest => dispatch(receiveNewInterest(interest)))
  .catch(err => console.log(err))  
}
 

export const deleteInterest = interestId => dispatch => {
  // dispatch(startLoadingAll());
  // setTimeout(() => {
  //   dispatch(endLoadingAll());
  // }, 3000);

  return InterestApiUtil.deleteInterest(interestId)
    .then(response => dispatch(removeInterest(response.data.id)))
    .catch(err => console.log(err));
}

