const notFoundMiddleware = (req, res, next) => {
  res.status(404).send(`
    <h3>Route Does not Exist</h3>
    <a href="/">Go Back</a>
  `);
};

module.exports = notFoundMiddleware;
