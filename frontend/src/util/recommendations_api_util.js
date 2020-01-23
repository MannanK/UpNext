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

export const fetchAllRecommendations = () => {
  return axios.get('/api/recommendations/all');
};

export const createAllRecommendations = (data) => {
  debugger;
  return axios.post('/api/recommendations/all', { data });
};