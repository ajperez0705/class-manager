import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({
    ...post,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No post with that id");
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );

  res.json(updatePost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  // check if user is authenticated. UserId i scoming from the auth middleware
  if (!req.userId) return res.json({ message: "Unathenticated" });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No post with that id");
  }

  const post = await PostMessage.findById(id);

  // Searching if the user has already liked the post. If not, it will result in a dislike
  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { finalComment } = req.body;
  console.log(req.body);

  const post = await PostMessage.findById(id);

  post.comments.push({ message: finalComment });

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const deleteComment = async (req, res) => {
  const { postID, commentID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postID)) {
    return res.status(404).send("No comment with that postID");
  }

  const post = await PostMessage.findById(postID);
  // console.log(post);

  post.comments.forEach((comment) => {
    console.log(String(comment._id));
  });

  post.comments = post.comments.filter(
    (comment) => String(comment._id) !== commentID
  );
  // console.log(post);

  await PostMessage.findByIdAndUpdate(postID, post, {
    new: true,
  });

  res.json({ message: "Comment deleted successfully" });
};
