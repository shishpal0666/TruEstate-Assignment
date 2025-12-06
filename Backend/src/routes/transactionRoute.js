const express = require("express");

const router = express.Router();

const { health } = require("../controllers/healthController");
const { listTransactions } = require("../controllers/transactionController");


router.get('/health', health);
router.get('/', listTransactions);

module.exports = router;
