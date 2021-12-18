import express from "express";
import {
  getStudents,
  signin,
  signup,
  updatePoints,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

// Updates student points
router.patch("/:id", updatePoints);

router.get("/class", getStudents);
export default router;
