import express from "express";
import {
  getStudents,
  purchaseTrophy,
  signin,
  signup,
  updatePoints,
} from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

// Updates student points
router.patch("/:id", updatePoints);
router.patch("/:id/trophy", purchaseTrophy);

router.get("/class", getStudents);
export default router;
