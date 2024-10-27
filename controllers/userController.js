const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Get all users
exports.getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Get a single user by ID
exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});
