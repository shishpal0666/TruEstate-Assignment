const { registerUser, loginUser } = require("../services/auth");

const register = async (req, res) => {
  const user = await registerUser(req.body);
  res.json({ user, message: "Registered successfully" });
};

const login = async (req, res) => {
  const data = await loginUser(req.body);
  res.json(data);
};

module.exports = { register, login };