import * as RecommendationAPIUtil from '../util/recommendations_api_util';

export const RECEIVE_RECOMMENDATIONS = "RECEIVE_RECOMMENDATIONS";
export const RECEIVE_SIMILAR_RECOMMENDATIONS = "RECEIVE_SIMILAR_RECOMMENDATIONS";
export const RECEIVE_ALL_RECOMMENDATIONS = "RECEIVE_ALL_RECOMMENDATIONS";

export const receiveRecommendations = recommendations => ({
  type: RECEIVE_RECOMMENDATIONS,
  recommendations
});

export const receiveSimilarRecommendations = recommendations => ({
  type: RECEIVE_SIMILAR_RECOMMENDATIONS,
  recommendations
});

export const receiveAllRecommendations = recommendations => ({
  type: RECEIVE_ALL_RECOMMENDATIONS,
  recommendations
});

export const createSimilarRecommendations = data => dispatch => (
  RecommendationAPIUtil.createSimilarRecommendations(data).then(res => {
    dispatch(receiveSimilarRecommendations(res.data));
  })
);

export const createAllRecommendations = data => dispatch => {
  return RecommendationAPIUtil.createAllRecommendations(data).then(res => {
    dispatch(receiveAllRecommendations(res.data));
  });
};

export const fetchSimilarRecommendations = () => dispatch => (
  RecommendationAPIUtil.fetchSimilarRecommendations().then(res => {
    dispatch(receiveSimilarRecommendations(res.data));
  })
);


///MAY NOT NEED THIS////
export const fetchAllRecommendations = () => dispatch => (
  RecommendationAPIUtil.fetchAllRecommendations().then(res => {
    dispatch(receiveAllRecommendations(res.data));
  })
);