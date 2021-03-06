import axios from 'axios';

export const getInterests = () => {
  return axios.get(`/api/interests`);
};

export const addInterest = data => {
  return axios.post('/api/interests/', data);
};

export const deleteInterest = interestId => {
  return axios.delete(`api/interests/${interestId}`);
};