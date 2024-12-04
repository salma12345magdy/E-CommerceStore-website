const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {  
  const { firstName, lastName, email, password } = req.body;

  
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'First Name, Last Name, Email, and Password are required.' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    
    user.password = await bcrypt.hash(password, 10);

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.matchPassword(password); 
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };

