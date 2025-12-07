const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const { me, register, login, logout } = require("../controllers/authController");
const { authRequired } = require("../utils/authMiddleware")

const router = express.Router();

router.get('/me', authRequired, asyncHandler(me));
router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));
router.post('/logout', asyncHandler(logout));

module.exports = router;
