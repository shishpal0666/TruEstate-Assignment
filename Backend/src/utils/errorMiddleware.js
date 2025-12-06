const errorMiddleware = (err, req, res, next)=>{
  console.error("Error:", err);

  const status = err.statusCode || 500;

  res.status(status).json({
    error: err.message || "Internal server error",
    details: err.details || null
  });
}

module.exports = errorMiddleware;
