const { getSummary } = require("../services/getSummary");

const getSummarycontroller = async (req, res) => {
  try {
    const summary = await getSummary(req.query);
    res.json(summary);
  } catch (err) {
    console.error("Error in getSummary:", err);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
};


module.exports = { getSummarycontroller };