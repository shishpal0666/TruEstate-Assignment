const { getTransactions } = require("../services/getTransaction");

health = (req, res) => {
  res.json({ status: "ok", service: "transactions" });
};

listTransactions = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const result = await getTransactions({ page, pageSize });
    res.json(result);
  } catch (err) {
    console.error("Error in listTransactions:", err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

module.exports = { health, listTransactions };
