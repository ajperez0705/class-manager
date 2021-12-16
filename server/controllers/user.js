import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const signin = async (req, res) => {
  // Grab the email and password from client (through the req.body)
  const { username, password } = req.body;

  try {
    //   Find if a user exists
    const existingUser = await User.findOne({ username });

    // If no usesr throw error
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    //   Compare password to user hashed password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      {
        username: existingUser.username,
        id: existingUser._id,
      },
      "test",
      { expiresIn: "1h" }
    );

    // Sends back existing User data and the created token
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(404).json({ message: "User already exists" });

    if (password !== confirmPassword)
      return res.status(404).json({ message: "Passwords do not match" });

    //   The second arg of 12 within the hash method is known as salt, which stands for how difficult you want the password to be hashed
    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      username,
      email,
      password: hashedPassword,
      isTeacher: false,
      negPoints: 0,
      posPoints: 0,
      totalPoints: 0,
      trophyA: null,
      trophyB: null,
      trophyC: null,
      totalTrophies: 0,
    });

    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      "test",
      { expiresIn: "1h" }
    );

    // Sends back user data and the created token
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getStudents = async (req, res) => {
  try {
    const users = await User.find();

    const students = users.filter((user) => user.isTeacher === false);
    console.log(students);

    res.status(200).json(students);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
