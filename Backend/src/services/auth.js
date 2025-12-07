const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/password");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = "7d";

const registerUser = async ({ name, email, password }) => {

  const exists = await User.findOne({ email });
  if (exists) {
    const error = new Error("Email already registered");
    error.statusCode = 400;
    throw error;
  }

  const hashed = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: "user"
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};


module.exports = { registerUser, loginUser };