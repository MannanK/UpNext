
const mongoose = require('mongoose');
const Schema = mongoonse.Schema;

const InterestSchema = new Schema({
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Interest = mongoose.model('Interest', InterestSchema)