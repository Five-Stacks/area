/* Verify if user is admin Middleware */
export const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, error: 'Access Denied. Admins only.' });
  }
};

/* Export middleware */
export default verifyAdmin;
