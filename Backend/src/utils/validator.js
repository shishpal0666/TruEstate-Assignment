module.exports = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.query, { abortEarly: false });

  if (error) {
    return next({
      statusCode: 400,
      message: "Validation failed",
      details: error.details.map((e) => e.message)
    });
  }

  req.query = value;
  next();
};
