const buildFilter = (params)=>{
  const {
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
  } = params;

  const filter = {};

  if (q && typeof q === "string" && q.trim().length > 0) {
    filter.$text = { $search: q.trim() };
  }

  const toArray = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) {
      return val
        .flatMap((v) => String(v).split(","))
        .map((v) => v.trim())
        .filter(Boolean);
    }
    return String(val)
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  };

  const regionsArr = toArray(regions);
  const gendersArr = toArray(genders);
  const categoriesArr = toArray(productCategories);
  const tagsArr = toArray(tags);
  const paymentsArr = toArray(paymentMethods);

  if (regionsArr.length) filter["customer.region"] = { $in: regionsArr };
  if (gendersArr.length) filter["customer.gender"] = { $in: gendersArr };
  if (categoriesArr.length) filter["product.category"] = { $in: categoriesArr };
  if (paymentsArr.length) filter.paymentMethod = { $in: paymentsArr };

  if (tagsArr.length) filter["product.tags"] = { $in: tagsArr };

  const ageQuery = {};
  const minAgeNum = ageMin != null ? Number(ageMin) : null;
  const maxAgeNum = ageMax != null ? Number(ageMax) : null;
  if (!Number.isNaN(minAgeNum) && minAgeNum !== null) ageQuery.$gte = minAgeNum;
  if (!Number.isNaN(maxAgeNum) && maxAgeNum !== null) ageQuery.$lte = maxAgeNum;
  if (Object.keys(ageQuery).length) {
    filter["customer.age"] = ageQuery;
  }

  const dateQuery = {};
  if (dateFrom) {
    const dFrom = new Date(dateFrom);
    if (!isNaN(dFrom.getTime())) dateQuery.$gte = dFrom;
  }
  if (dateTo) {
    const dTo = new Date(dateTo);
    if (!isNaN(dTo.getTime())) dateQuery.$lte = dTo;
  }
  if (Object.keys(dateQuery).length) {
    filter.date = dateQuery;
  }

  return filter;
}


module.exports = { buildFilter };