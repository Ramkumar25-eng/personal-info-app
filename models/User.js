const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  dob: String,
  number: String,
  email: String,
  avatar: String // base64 image string
});

module.exports = mongoose.model('User', userSchema);
