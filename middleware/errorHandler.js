// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message });
}

module.exports = {
  errorHandler,
};
