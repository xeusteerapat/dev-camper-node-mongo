// @desc Logs request to console
const logger = (req, res, next) => {
  console.log(
    `${req.method} request method for ${req.protocol}://${req.get('host')}${
      req.originalUrl
    }`
  );
  next();
};

module.exports = logger;
