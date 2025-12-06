async function health(req, res){
  res.json({ status: "ok", service: "transactions" });
};

module.exports = { health };