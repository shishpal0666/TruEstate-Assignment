const express = require("express");

const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const validator = require("../utils/validator");
const { transactionQuerySchema } = require("../services/validation");
const { authRequired, authorizeRoles } = require("../utils/authMiddleware");

const { health } = require("../controllers/healthController");
const { listTransactions } = require("../controllers/listTransactionsController");
const { getFilters } = require("../controllers/getFilterscontroller");
const { getSummarycontroller } = require("../controllers/getSummaryController");

router.get('/health', asyncHandler(health));

router.use(authRequired);

router.get("/filters", authorizeRoles("admin", "user"), asyncHandler(getFilters));
router.get("/summary", validator(transactionQuerySchema), authorizeRoles("admin", "user"), asyncHandler(getSummarycontroller));

router.get(
  "/",
  validator(transactionQuerySchema),
  authorizeRoles("admin", "user"),
  asyncHandler(listTransactions)
);


module.exports = router;
