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

export const getAllRecommendations = function (genreIds, page = 1) {
  // put API docs URL
  // test out include_video

  let release_date = new Date(Date.now()).toISOString().split("T")[0];
  let genres = genreIds.join("%2C");

  return instance
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}` +
      `&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false` + 
      `&page=${page}&release_date.lte=${release_date}&vote_count.gte=100&vote_average.gte=5` + 
      `&with_genres=${genres}`
    );
};

export const getMovieSuggestions = function(keyword) {
  // https://developers.themoviedb.org/3/search/search-movies

  return instance
    .get(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${keyword}&include_adult=false`);
};

// ------------------------------------------------------------- //

// 1. first check if user.preferences.high.length > 3
//    - shuffle the array, then pick the first 3 high's

const shuffleArray = (array) => {
  for(let idx1 = array.length-1; idx1 > 0; idx1--) {
    const idx2 = Math.floor(Math.random() * (idx1 + 1));
    [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
  }

  return array;
};

