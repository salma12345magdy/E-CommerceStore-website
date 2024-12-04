const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const protect = require('../middleware/protect');

router.post('/register', registerUser);

router.post('/login', loginUser);


router.post('/cart/add', protect, (req, res) => {
    const product = req.body.product;  
    res.status(200).json({ message: 'Product added to cart successfully' });
  });

module.exports = router;
