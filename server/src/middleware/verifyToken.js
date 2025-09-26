/* Import modules */
import jwt from 'jsonwebtoken';

/* Verify Token Middleware */
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token expired or invalid' });
  }
};

/* Export middleware */
export default verifyToken;
