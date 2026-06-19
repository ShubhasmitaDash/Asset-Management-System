module.exports = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userRole = req.user.Role || req.user.role;

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Access Denied" });
    }

    next();
  };
};