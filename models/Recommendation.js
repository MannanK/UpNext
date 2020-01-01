const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecommendationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Recommendation = mongoose.model('Recommendation', RecommendationSchema);