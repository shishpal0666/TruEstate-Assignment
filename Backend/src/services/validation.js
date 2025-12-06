const Joi = require("joi");

exports.transactionQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  pageSize: Joi.number().integer().min(1).max(100).optional(),

  q: Joi.string().allow("").optional(),

  regions: Joi.alternatives(Joi.string(), Joi.array().items(Joi.string())).optional(),
  genders: Joi.alternatives(Joi.string(), Joi.array().items(Joi.string())).optional(),
  productCategories: Joi.alternatives(Joi.string(), Joi.array().items(Joi.string())).optional(),
  tags: Joi.alternatives(Joi.string(), Joi.array().items(Joi.string())).optional(),
  paymentMethods: Joi.alternatives(Joi.string(), Joi.array().items(Joi.string())).optional(),

  ageMin: Joi.number().min(0).optional(),
  ageMax: Joi.number().min(0).optional(),

  dateFrom: Joi.date().optional(),
  dateTo: Joi.date().optional(),

  sortBy: Joi.string().valid("date", "quantity", "customerName").optional(),
  sortOrder: Joi.string().valid("asc", "desc").optional()
});
