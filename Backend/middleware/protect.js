const jwt = require('jsonwebtoken');


const protect = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Please log in to access this resource' });
  }
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret_key');
    req.user = decoded;  
    next();  
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = protect;
