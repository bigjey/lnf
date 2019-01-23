const db = require('../../db');
const { saveImageToFile } = require('../../utils/saveImageToFile');

const createPost = async (req, res, next) => {
  try {
    const { breed, gender, description, image: base64 } = req.body;
    const { id } = req.user;
    let image = null;

    if (base64) {
      image = await saveImageToFile(base64);
    }

    const post = await db.Post.create({
      breed,
      gender,
      description,
      image,
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
