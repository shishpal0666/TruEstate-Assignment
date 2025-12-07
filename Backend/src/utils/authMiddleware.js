const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME;

const authRequired = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    } else if (req.cookies && req.cookies[COOKIE_NAME]) {
      token = req.cookies[COOKIE_NAME];
    }

    if (!token) {
      return next({ statusCode: 401, message: "Authorization token missing" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return next({ statusCode: 401, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return next({ statusCode: 401, message: "Invalid or expired token" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next({ statusCode: 403, message: "You do not have permission" });
    }
    next();
  };
};

module.exports = { authRequired, authorizeRoles };
