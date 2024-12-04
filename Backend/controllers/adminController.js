const Admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

const secretKey = 'bldh3ON18E'; 


const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    const token = jwt.sign(
      { adminId: admin._id, role: 'admin' }, 
      secretKey,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


const addAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


module.exports = { adminLogin, addAdmin };

