/* Import modules */
import jwt from 'jsonwebtoken';

/* Verify Token Middleware */
const verifyToken = (req, res, next) => {
  let token;
  if (req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(401).json({ success: false, error: 'Access Denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: 'Token expired or invalid' });
  }
};

/* Export middleware */
export default verifyToken;
