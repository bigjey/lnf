const router = require('express').Router();

const checkAuth = require('../../utils/checkAuth');
const controller = require('./controller');

router
  .route('/')
  .post(checkAuth, controller.createPost)
  .get(checkAuth, controller.getAllPosts);

router.route('/:id').delete(checkAuth, controller.deletePost);

module.exports = router;
