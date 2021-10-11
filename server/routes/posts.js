import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// The route starts from localhost:5000/posts/
router.get("/", getPosts);
router.post("/", auth, createPost);

// Need to know id to be able to edit the post
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

// Acts as an update
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
