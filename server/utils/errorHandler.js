const sequelize = require('sequelize');

function errorHandler(error, req, res, next) {
  if (error instanceof sequelize.ValidationError) {
    res.status(400);

    return res.json(
      error.errors.map((err) => ({
        message: err.message,
        path: err.path
      }))
    );
  }

  if (res.statusCode === 200) {
    res.status(500);
  }

  res.json({ error: error.message });
}

module.exports = errorHandler;
