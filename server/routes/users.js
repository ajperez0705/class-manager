import express from "express";
import { getStudents, signin, signup } from "../controllers/user.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);

router.get("/class", getStudents);
export default router;
