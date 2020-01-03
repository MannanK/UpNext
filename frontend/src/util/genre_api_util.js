import axios from 'axios';

export const getGenres = () => {
  return axios.get("/api/genres");
};

export const addGenre = data => {
  return axios.post("/api/genres");
};

export const updateGenre = data => {
  return axios.patch("/api/genres");
};