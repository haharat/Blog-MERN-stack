const PostModel = require("../models/post");

const createPost = async (req, res) => {
  const { title, description } = req.body;

  const post = await PostModel.create({
    title: title,
    description: description,
    postedDate: Date.now(),
  });

  if (post) {
    res.status(201).json({
      id: post._id,
      title: post.title,
      description: post.description,
      postedDate: post.postedDate,
    });
  } else {
    res.status(500).send({ message: "Unable to create post" });
  }
};

const getPosts = async (req, res) => {
  const posts = await PostModel.find({}); //find something takes time, so it is a async function
  res.status(200).send(posts);
};

const getPost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).send({ message: "Post not found!" });
  }
};

const updatePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (post) {
    post.title = req.body.title;
    post.description = req.body.description;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } else {
    res.status(404).send({ message: "Post not found!" });
  }
};

const deletePost = async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (post) {
    await post.remove();
    res.status(200).send({ message: "Post successfully removed" });
  } else {
    res.status(404).send({ message: "Post not found!" });
  }
};

module.exports = { createPost, getPosts, updatePost, getPost, deletePost };
