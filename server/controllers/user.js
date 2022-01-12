import mongoose from "mongoose";
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
    if (!existingUser) {
      return res.status(400).json({ message: "Username doesn't exist" });
    }

    //   Compare password to user hashed password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Password" });
    }

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
    res.status(500).json({ message: `Something went wrong: ${error}` });
  }
};

export const signup = async (req, res) => {
  const { username, email, password, confirmPassword, avatar, bio } = req.body;
  let errors = [];
  const emailValidation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

  try {
    const existingUsername = await User.findOne({ username });
    const existingUserEmail = await User.findOne({ email });

    // Series of checks for each input value. If already exists, or some other validation error, push into errors array
    if (existingUsername) {
      errors.push("Username already exists");
      // return res.status(404).json({ message: "User already exists" });
      console.log(errors);
    } else if (username.length < 2) {
      errors.push("Username must be more than 2 characters");
    }

    if (existingUserEmail) {
      errors.push("Email already exists");
      // return res.status(404).json({ message: "User already exists" });
      console.log(errors);
    } else if (!email.match(emailValidation)) {
      errors.push("Example of a valid email: someone@example.com");
    }

    if (!password.match(passwordValidation)) {
      errors.push(
        "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase."
      );
    }

    if (password !== confirmPassword) {
      errors.push("Password and Confirm Password fields must match!");
      // return res.status(404).json({ message: "Passwords do not match" });
    }

    //   The second arg of 12 within the hash method is known as salt, which stands for how difficult you want the password to be hashed
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log(bio.length);
    if (bio.length < 25 || bio.length > 250) {
      errors.push(
        "Bio must be at least 25 characters, and less then 250 characters."
      );
    }

    if (!avatar) {
      errors.push("An avatar must be created using the generate button.");
      // return res.status(404).json({ message: "Passwords do not match" });
    }

    if (errors.length > 0) {
      return res.status(404).json({ errors });
    }
    // End of Validation Checks

    const result = await User.create({
      username,
      email,
      avatar,
      bio,
      password: hashedPassword,
      isTeacher: false,
      totalPoints: 0,
      allTimePoints: 0,
      negPoints: 0,
      curPoints: 0,
      marvinMoneybags: 0,
      stanleySwordington: 0,
      bradleyBomberman: 0,
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

// Change points
export const updatePoints = async (req, res) => {
  console.log("reached update point controller");
  const { id: _id } = req.params;
  const student = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No student with that id");
  }

  const updatedStudent = await User.findByIdAndUpdate(
    _id,
    { ...student, _id },
    {
      new: true,
    }
  );

  res.json(updatedStudent);
};

// Purchase Trophy
export const purchaseTrophy = async (req, res) => {
  console.log("reached purchase trophy controller");
  const { id: _id } = req.params;
  const student = req.body;

  console.log(student);
  console.log(_id);

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("No student with that id");
  }

  const updatedStudent = await User.findByIdAndUpdate(
    _id,
    { ...student, _id },
    {
      new: true,
    }
  );

  res.json(updatedStudent);
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
