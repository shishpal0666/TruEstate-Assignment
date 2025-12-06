const { getSummary } = require("../services/getSummary");

const getSummarycontroller = async (req, res) => {
  const data = await getSummary(req.query);
  res.json(data);
};

module.exports = { getSummarycontroller };