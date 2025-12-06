const { getFiltersMetadata } = require("../services/getFilterMetadata");

const getFilters = async (req, res) => {
  const data = await getFiltersMetadata();
  res.json(data);
};

module.exports = { getFilters };