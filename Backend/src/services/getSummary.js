const Transaction = require("../models/transactionsSchema");
const { buildFilter } = require("./buildFilter");

const getSummary = async(params)=>{
  const filter = buildFilter(params);

  const [result] = await Transaction.aggregate([
    { $match: filter },
    {
      $group: {
        _id: null,
        totalUnits: { $sum: '$sales.quantity' },
        totalAmount: { $sum: '$sales.totalAmount' },
        totalDiscount: {
          $sum: {
            $subtract: ['$sales.totalAmount', '$sales.finalAmount']
          }
        }
      }
    }
  ]);

  return {
    totalUnits: result?.totalUnits || 0,
    totalAmount: result?.totalAmount || 0,
    totalDiscount: result?.totalDiscount || 0
  };
}

module.exports = { getSummary };
