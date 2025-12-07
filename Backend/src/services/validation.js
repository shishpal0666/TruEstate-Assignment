const Joi = require('joi');

const multiStringOrEmpty = Joi.alternatives().try(
  Joi.string().allow('').optional(),
  Joi.array().items(Joi.string()).optional()
);

const optionalDateOrEmpty = Joi.alternatives().try(
  Joi.date().iso().raw().optional(), 
  Joi.string().allow('').optional()
);

exports.transactionQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  pageSize: Joi.number().integer().min(1).max(100).optional(),

  q: Joi.string().allow('').optional(),

  regions: multiStringOrEmpty,
  genders: multiStringOrEmpty,
  productCategories: multiStringOrEmpty,
  tags: multiStringOrEmpty,
  paymentMethods: multiStringOrEmpty,

  ageMin: Joi.alternatives().try(Joi.number().min(0), Joi.string().allow('').optional()).optional(),
  ageMax: Joi.alternatives().try(Joi.number().min(0), Joi.string().allow('').optional()).optional(),

  dateFrom: optionalDateOrEmpty,
  dateTo: optionalDateOrEmpty,

  sortBy: Joi.string().valid('date', 'quantity', 'customerName').optional(),
  sortOrder: Joi.string().valid('asc', 'desc').optional()
});
