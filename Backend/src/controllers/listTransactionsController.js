const { getTransactions } = require('../services/getTransaction');

const listTransactions = async (req, res) => {
  const result = await getTransactions(req.query);
  res.json(result);
};

module.exports = { listTransactions };