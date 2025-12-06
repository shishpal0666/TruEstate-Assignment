const Transaction = require("../models/transactionsSchema");

async function getTransactions({ page = 1, pageSize = 10 }) {
  const pageNum = Math.max(parseInt(page, 10) || 1, 1);
  const limit = Math.max(parseInt(pageSize, 10) || 10, 1);
  const skip = (pageNum - 1) * limit;

  const filter = {};

  const [items, totalItems] = await Promise.all([
    Transaction.find(filter)
      .sort({ date: -1, _id: 1 })
      .skip(skip)
      .limit(limit)
      .lean(),
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
