import axios from 'axios';

export const changeRecommendations = (data) => {
  return axios.post('/api/recommendations/', data);
};