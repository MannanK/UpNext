import axios from 'axios';

export const fetchGenres = () => {
  return axios.get("/api/genres");
};

export const createGenre = data => {
  return axios.post("/api/genres", data);
};

// export const updateGenre = data => {
//   return axios.patch("/api/genres", data);
// };

export const updateGenre = (data, genreId) => {
  return axios.patch(`/api/genres/${genreId}`, data);
};