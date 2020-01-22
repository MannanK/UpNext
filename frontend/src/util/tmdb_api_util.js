import keys from "../config/keys";
import axios from 'axios';
const tmdbApiKey = keys.tmdbApiKey;

const instance = axios.create();
instance.defaults.headers.common = {};
instance.defaults.headers.common.accept = 'application/json';

export const getMovieInfo = function(id) {
  // https://developers.themoviedb.org/3/movies/get-movie-details

  return instance.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}`);
};

export const getSimilarRecommendations = function(id) {
  return instance.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${tmdbApiKey}`);
};

export const getMovieSuggestions = function(keyword) {
  // https://developers.themoviedb.org/3/search/search-movies

  return instance
    .get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${keyword}&include_adult=false`);
}