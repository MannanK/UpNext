import axios from 'axios';

export const getRecommendations = () => {
  return axios.get(`/api/recommendations`);
};

export const createSimilarRecommendation = (data, recId) => {
  return axios.post('/api/recommendations/similar', { data, recId });
};