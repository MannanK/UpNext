
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InterestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
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
  runtime: {
    type: Number,
    required: true
  },
  voteAverage: {
    type: Number,
    required: true
  },
  voteCount: {
    type: Number,
    required: true
  }
});

module.exports = Interest = mongoose.model('Interest', InterestSchema)