import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routers
import postRoutes from "./routes/posts.js";

const app = express();

// This adds the prefix 'posts' to all routes within the posts file
// NOT localhost:5000/
// YES localhost:5000/posts

app.use(cors());

app.use("/posts", postRoutes);

// MongoDB
const MONGODB =
  "mongodb+srv://testuser:GhjPC1sdAUlpJiUo@cluster0.z8inf.mongodb.net/class-manager?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    return app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
  });
