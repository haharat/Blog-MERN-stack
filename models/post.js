const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  postedDate: {
    type: Date,
  },
});

const Post = mongoose.model("Post", postSchema);
//this "post" parameter will create a new collection named "posts" in the database

module.exports = Post;
