const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @route   POST /api/users
// @desc    Create a new user
router.post("/", async (req, res) => {
  try {
    const { name, age, gender, dob, number, email, avatar } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ name, age, gender, dob, number, email, avatar });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /api/users/:email
// @desc    Get a user by email
router.get("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
