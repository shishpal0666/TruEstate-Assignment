const express = require('express');
const { health, listTransactions } = require('../controllers/transactionController');

const router = express.Router();

router.get('/health', health);

router.get('/', listTransactions);

module.exports = router;
