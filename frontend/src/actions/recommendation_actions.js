import * as RecommendationAPIUtil from '../util/recommendations_api_util';

export const RECEIVE_RECOMMENDATIONS = "RECEIVE_RECOMMENDATIONS";
export const RECEIVE_SIMILAR_RECOMMENDATIONS = "RECEIVE_SIMILAR_RECOMMENDATIONS";

export const receiveRecommendations = recommendations => ({
  type: RECEIVE_RECOMMENDATIONS,
  recommendations
});

export const receiveSimilarRecommendations = recommendations => ({
  type: RECEIVE_SIMILAR_RECOMMENDATIONS,
  recommendations
});

export const fetchDiscoveryRecommendations = () => dispatch => (
  RecommendationAPIUtil.fetchRecommendations().then(res => {
    dispatch(receiveRecommendations(res.data));
  })
);

export const createSimilarRecommendations = data => dispatch => (
  RecommendationAPIUtil.createSimilarRecommendations(data).then(res => {
    dispatch(receiveSimilarRecommendations(res.data));
  })
);

export const fetchSimilarRecommendations = () => dispatch => (
  RecommendationAPIUtil.fetchSimilarRecommendations().then(res => {
    dispatch(receiveSimilarRecommendations(res.data));
  })
);