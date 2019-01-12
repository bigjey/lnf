const apiRouter = require('express').Router();

const postRouter = require('./post');

apiRouter.use('/post', postRouter);

module.exports = apiRouter;
