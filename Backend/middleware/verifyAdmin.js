const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, 'your-secret-key');
      if (decoded.role === 'admin') {
        req.user = decoded;  
        next(); 
      } else {
        res.status(403).json({ message: 'Forbidden: Admins only' });
      }
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
    }
  };
  
  module.exports = verifyAdmin;
