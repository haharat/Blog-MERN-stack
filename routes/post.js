const express = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  getPost,
  deletePost,
} = require("../controllers/post");
const protect = require("../middlewares/auth");
const router = express.Router();

// http://localhost:5000/api/posts/
router.post("/", protect, createPost);
// http://localhost:5000/api/posts/
router.get("/", getPosts);
// http://localhost:5000/api/posts/:id
router.put("/:id", protect, updatePost);
// http://localhost:5000/api/posts/:id
router.get("/:id", getPost);
// http://localhost:5000/api/posts/:id
router.delete("/:id", protect, deletePost);

module.exports = router;
