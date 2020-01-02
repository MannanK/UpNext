import axios from 'axios';

export const getRecommendations = () => {
  return axios.get(`/api/recommendations`);
};

export const createSimilarRecommendations = (data) => {
  return axios.post('/api/recommendations/similar', { data });
};