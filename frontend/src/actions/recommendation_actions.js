import * as APIUtil from '../util/recommendations_api_util';

export const RECEIVE_RECOMMENDATIONS = "RECEIVE_RECOMMENDATIONS";

export const receiveRecommendations = recommendations => ({
  type: RECEIVE_RECOMMENDATIONS,
  recommendations
});

export const changeRecommendations = data => dispatch => (
  APIUtil.changeRecommendations(data).then(res => {
    dispatch(receiveRecommendations(res.data));
  })
);