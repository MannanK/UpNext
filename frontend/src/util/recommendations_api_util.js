import axios from 'axios';

export const getRecommendations = () => {
  return axios.get(`/api/recommendations`);
};

export const changeRecommendations = (data) => {
  return axios.post('/api/recommendations/', data);
};