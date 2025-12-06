const express = require("express");

const router = express.Router();

const { health } = require("../controllers/healthController");
const { listTransactions } = require("../controllers/listTransactionsController");
const { getFilters } = require("../controllers/getFilterscontroller");
const { getSummarycontroller } = require("../controllers/getSummaryController");

router.get('/health', health);
router.get('/', listTransactions);
router.get('/filters', getFilters);
router.get('/summary', getSummarycontroller);

module.exports = router;
