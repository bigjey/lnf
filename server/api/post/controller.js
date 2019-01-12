const db = require('../../db');

const createPost = async (req, res, next) => {
  try {
    const { breed, gender, description } = req.body;
    const { id } = req.user;

    const post = await db.Post.create({
      breed,
      gender,
      description,
      userId: id
    });

    res.json(post);
  } catch (err) {
    return next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({});

    res.json(posts);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createPost,
  getAllPosts
};
