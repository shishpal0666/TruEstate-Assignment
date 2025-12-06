const express = require("express");

const router = express.Router();

const { health } = require("../controllers/healthController");
const { listTransactions } = require("../controllers/listTransactionsController");
const { getFilters } = require("../controllers/getFilterscontroller");

router.get('/health', health);
router.get('/', listTransactions);
router.get('/filter', getFilters);

module.exports = router;
