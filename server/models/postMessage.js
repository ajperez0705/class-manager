import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  // id: { type: String },
  title: String,
  message: String,
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: [{ message: String }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
