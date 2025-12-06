const express = require("express");

const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const validator = require("../utils/validator");
const { transactionQuerySchema } = require("../services/validation");

const { health } = require("../controllers/healthController");
const { listTransactions } = require("../controllers/listTransactionsController");
const { getFilters } = require("../controllers/getFilterscontroller");
const { getSummarycontroller } = require("../controllers/getSummaryController");

router.get('/health', asyncHandler(health));
router.get('/', validator(transactionQuerySchema), asyncHandler(listTransactions));
router.get('/filters', asyncHandler(getFilters));
router.get('/summary', validator(transactionQuerySchema),asyncHandler(getSummarycontroller));

module.exports = router;
