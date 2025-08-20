const isAdmin = (req, res, next) => {
   console.log("Role from token:", req.user.role);
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admins only.' });
  }
};

export default isAdmin;
