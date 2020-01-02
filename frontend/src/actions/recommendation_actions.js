import * as RecommendationAPIUtil from '../util/recommendations_api_util';

export const RECEIVE_RECOMMENDATIONS = "RECEIVE_RECOMMENDATIONS";

export const receiveRecommendations = recommendations => ({
  type: RECEIVE_RECOMMENDATIONS,
  recommendations
});

export const getRecommendations = () => dispatch => (
  RecommendationAPIUtil.getRecommendations().then(res => {
    dispatch(receiveRecommendations(res.data));
  })
);

export const createSimilarRecommendations = data => dispatch => (
  RecommendationAPIUtil.createSimilarRecommendations(data).then(res => {
    dispatch(receiveRecommendations(res.data));
  })
);