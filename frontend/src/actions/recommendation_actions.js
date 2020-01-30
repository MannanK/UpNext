import * as RecommendationAPIUtil from '../util/recommendations_api_util';

export const RECEIVE_RECOMMENDATIONS = "RECEIVE_RECOMMENDATIONS";
export const RECEIVE_SIMILAR_RECOMMENDATIONS = "RECEIVE_SIMILAR_RECOMMENDATIONS";
export const RECEIVE_ALL_RECOMMENDATIONS = "RECEIVE_ALL_RECOMMENDATIONS";
export const START_LOADING_SIMILAR_RECOMMENDATIONS = "START_LOADING_SIMILAR_RECOMMENDATIONS";
export const START_LOADING_ALL_RECOMMENDATIONS = "START_LOADING_ALL_RECOMMENDATIONS";
export const END_LOADING_ALL_RECOMMENDATIONS = "END_LOADING_ALL_RECOMMENDATIONS";




///////FOR LOADING

export const startLoadingSimilar = () => {
  return {
    type: START_LOADING_SIMILAR_RECOMMENDATIONS
  };
};

export const startLoadingAll = () => {
  return {
    type: START_LOADING_ALL_RECOMMENDATIONS
  };
};

export const endLoadingAll = () => {
  return {
    type: END_LOADING_ALL_RECOMMENDATIONS
  };
}

///////

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

export const createSimilarRecommendations = data => dispatch => {
  dispatch(startLoadingSimilar());

  RecommendationAPIUtil.createSimilarRecommendations(data).then(res => {
    dispatch(receiveSimilarRecommendations(res.data));
  });
};

export const createAllRecommendations = data => dispatch => {
  // dispatch(startLoadingAll());
  // setTimeout(() => {
  //   dispatch(endLoadingAll());
  // }, 1500);
  
  return RecommendationAPIUtil.createAllRecommendations(data).then(res => {
    dispatch(receiveAllRecommendations(res.data));
  });
};

export const fetchSimilarRecommendations = () => dispatch => {
  dispatch(startLoadingSimilar());

  RecommendationAPIUtil.fetchSimilarRecommendations().then(res => {
    dispatch(receiveSimilarRecommendations(res.data));
  });
};

///MAY NOT NEED THIS////
export const fetchAllRecommendations = () => dispatch => {
  dispatch(startLoadingAll());


  RecommendationAPIUtil.fetchAllRecommendations().then(res => {
    dispatch(receiveAllRecommendations(res.data));
  });
};

export const deleteAllRecommendations = () => dispatch => {
  return RecommendationAPIUtil.deleteAllRecommendations().then(res => {
    dispatch(receiveAllRecommendations(res.data));
  });
};
