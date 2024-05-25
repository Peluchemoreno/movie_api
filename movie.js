const { Schema } = require('mongoose')
const mongoose = require('./mongoose')

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  }
})

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;