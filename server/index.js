import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routers
import postRoutes from "./routes/posts.js";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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