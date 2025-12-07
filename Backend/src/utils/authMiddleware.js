const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const JWT_SECRET = process.env.JWT_SECRET;

const authRequired = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next({ statusCode: 401, message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return next({ statusCode: 401, message: "User no longer exists" });
    }

    next();
  } catch (err) {
    next({ statusCode: 401, message: "Invalid or expired token" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next({
        statusCode: 403,
        message: "You do not have permission to perform this action"
      });
    }
    next();
  };
};


module.exports = { authRequired, authorizeRoles }