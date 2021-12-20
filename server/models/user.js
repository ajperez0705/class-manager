import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  totalPoints: { type: Number },
  allTimePoints: { type: Number },
  trophyA: { type: String },
  trophyB: { type: String },
  trophyC: { type: String },
  totalTrophies: { type: Number },
  isTeacher: { type: Boolean },
});

const User = mongoose.model("User", userSchema);

export default User;
