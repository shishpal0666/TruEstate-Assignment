const health = async(req, res)=>{
  res.json({ status: "ok", service: "transactions" });
};

module.exports = { health };