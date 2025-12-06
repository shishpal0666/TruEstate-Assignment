const Transaction = require("../models/transactionsSchema");
const { buildFilter } = require("./buildFilter");
const { buildSort } =require("./buildSort");


const getTransactions = async (params)=>{
  const {
    page = 1,
    pageSize = 10,
    q,
    regions,
    genders,
    productCategories,
    tags,
    paymentMethods,
    ageMin,
    ageMax,
    dateFrom,
    dateTo,
    sortBy,
    sortOrder,
  } = params;

  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limit = Math.max(parseInt(pageSize, 10) || 10, 1);
  const skip = (pageNum - 1) * limit;

  const filter = buildFilter({
    q,
    regions,
    genders,
    productCategories,
    tags,
    paymentMethods,
    ageMin,
    ageMax,
    dateFrom,
    dateTo,
  });

  const sort = buildSort({ sortBy, sortOrder });

  const [items, totalItems] = await Promise.all([
    Transaction.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Transaction.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalItems / limit) || 1;

  return {
    meta: {
      page: pageNum,
      pageSize: limit,
      totalItems,
      totalPages,
    },
    data: items,
  };
}

module.exports = { getTransactions };