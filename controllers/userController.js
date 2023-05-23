// userController.js
const User = require('../models/userModel');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, contact } = req.body;
    const errorData = {};

    // Validate input data
    if (!name) {
      errorData.name = 'Name is required';
    }
    if (!email) {
      errorData.email = 'Email is required';
    }
    if (!contact) {
      errorData.contact = 'Contact is required';
    }

    // Check if email already exists in the database
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      errorData.email = 'Email already exists';
    }

    // Check if contact already exists in the database
    const existingContact = await User.findOne({ contact });
    if (existingContact) {
      errorData.contact = 'Contact already exists';
    }

    // Handle validation errors
    if (Object.keys(errorData).length !== 0) {
      return res.status(400).json({ error: errorData });
    }

    // Create a new user
    const user = await User.create({ name, email, contact });

    // Send success response
    return res.status(201).json({ message: 'User created successfully', data: user });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ error: 'Failed to create user' });
  }
};


// userController.js

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'An error occurred while retrieving users.' });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the user.' });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
};

