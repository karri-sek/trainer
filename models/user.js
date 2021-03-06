var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userid: {
    type: Number,
    required: true
  }
});
