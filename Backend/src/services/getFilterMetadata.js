const Transaction = require("../models/transactionsSchema");


const getFiltersMetadata = async()=>{
  const [
    regions,
    genders,
    productCategories,
    tags,
    paymentMethods,
    ageStats,
    dateStats
  ] = await Promise.all([
    Transaction.distinct('customer.region'),
    Transaction.distinct('customer.gender'),
    Transaction.distinct('product.category'),
    Transaction.distinct('product.tags'),
    Transaction.distinct('paymentMethod'),
    Transaction.aggregate([
      {
        $group: {
          _id: null,
          minAge: { $min: '$customer.age' },
          maxAge: { $max: '$customer.age' }
        }
      }
    ]),
    Transaction.aggregate([
      {
        $group: {
          _id: null,
          minDate: { $min: '$date' },
          maxDate: { $max: '$date' }
        }
      }
    ])
  ]);

  const age = ageStats[0] || { minAge: null, maxAge: null };
  const date = dateStats[0] || { minDate: null, maxDate: null };

  return {
    regions: regions.filter(Boolean).sort(),
    genders: genders.filter(Boolean).sort(),
    productCategories: productCategories.filter(Boolean).sort(),
    tags: tags.filter(Boolean).sort(),
    paymentMethods: paymentMethods.filter(Boolean).sort(),
    ageRange: {
      min: age.minAge ?? null,
      max: age.maxAge ?? null
    },
    dateRange: {
      min: date.minDate ?? null,
      max: date.maxDate ?? null
    }
  };
}

module.exports = { getFiltersMetadata };
