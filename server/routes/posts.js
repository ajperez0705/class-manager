import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

const router = express.Router();

// The route starts from localhost:5000/posts/
router.get("/", getPosts);
router.post("/", createPost);

// Need to know id to be able to edit the post
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

// Acts as an update
router.patch("/:id/likePost", likePost);

export default router;
