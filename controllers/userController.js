const User = require('../models/User');

// POST /signup - Save user to DB
exports.createUser = async (req, res) => {
  try {
    const { name, age, gender, dob, number, email, avatar } = req.body;
    const user = await User.create({ name, age, gender, dob, number, email, avatar });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /user/:email - Fetch user by email
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
