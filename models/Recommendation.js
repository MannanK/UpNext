const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecommendationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  interest: {
    type: Schema.Types.ObjectId,
    ref: "Interest",
    default: null
  },
  similarMovieId: {
    type: Number,
    default: null
  },
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  movieId: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  overview: {
    type: String,
    required: true
  },
  voteAverage: {
    type: Number,
    required: true
  },
  voteCount: {
    type: Number,
    required: true
  },
  genres: {
    type: Array,
    required: true
  },
  runtime: {
    type: Number,
    required: true
  }
});

module.exports = Recommendation = mongoose.model('Recommendation', RecommendationSchema);