const { getTransactions } = require('../services/getTransaction');

async function listTransactions(req, res){
  try {
    const result = await getTransactions(req.query);
    res.json(result);
  } catch (err) {
    console.error("Error in listTransactions:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

module.exports = { listTransactions };