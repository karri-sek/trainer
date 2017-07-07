var mongoose = require('mongoose');

module.exports = mongoose.model('Post', {  
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  postid: {
    type: Number,
    required: true
  },
  userid: {
    type: Number,
    required: true
  }
});
