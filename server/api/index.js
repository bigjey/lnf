const apiRouter = require('express').Router();

apiRouter.use((req, res) => {
  res.send('hi');
});

module.exports = apiRouter;
