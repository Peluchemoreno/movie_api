const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  favoriteMovies: {
    type: [String]
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;