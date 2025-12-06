const { getFiltersMetadata } = require("../services/getFilterMetadata");

getFilters = async (req, res) => {
  try {
    const meta = await getFiltersMetadata();
    res.json(meta);
  } catch (err) {
    console.error('Error in getFilters:', err);
    res.status(500).json({ error: 'Failed to fetch filter metadata' });
  }
};

module.exports = { getFilters };