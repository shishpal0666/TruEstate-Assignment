const { registerUser, loginUser } = require("../services/auth");

const COOKIE_NAME = process.env.COOKIE_NAME;
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; 

const me = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  return res.json({ user: req.user });
};

const register = async (req, res) => {
  const { token, user } = await registerUser(req.body);
  
  const isProd = process.env.NODE_ENV === 'production';

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd, 
    sameSite: isProd ? 'none' : 'lax', 
    maxAge: COOKIE_MAX_AGE
  });

  res.json({ user, message: "Registered successfully" });
};

const login = async (req, res) => {
  const { token, user } = await loginUser(req.body);

  const isProd = process.env.NODE_ENV === 'production';

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProd, 
    sameSite: isProd ? 'none' : 'lax', 
    maxAge: COOKIE_MAX_AGE
  });

  res.json({ user, message: 'Login successful' });
};

const logout = async (req, res) => {
  const COOKIE_NAME_LOCAL = process.env.COOKIE_NAME || 'token';
  res.clearCookie(COOKIE_NAME_LOCAL, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  });
  res.json({ message: 'Logged out' });
};


module.exports = { me, register, login, logout };