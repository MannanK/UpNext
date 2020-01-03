import axios from 'axios';

export const fetchRecommendations = () => {
  return axios.get(`/api/recommendations`);
};

export const fetchSimilarRecommendations = () => {
  return axios.get('/api/recommendations/similar');
};

export const createSimilarRecommendations = (data) => {
  return axios.post('/api/recommendations/similar', { data });
};