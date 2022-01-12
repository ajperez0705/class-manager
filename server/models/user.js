import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  avatar: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, required: true },
  // id: { type: String },
  totalPoints: { type: Number },
  allTimePoints: { type: Number },
  marvinMoneybags: { type: String },
  stanleySwordington: { type: String },
  bradleyBomberman: { type: String },
  totalTrophies: { type: Number },
  isTeacher: { type: Boolean },
});

const User = mongoose.model("User", userSchema);

export default User;
