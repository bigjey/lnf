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

    posts.forEach(p => {
      if (p.image) {
        p.image = `${req.app.get('baseUrl')}/${p.image}`;
      }
    })

    res.json(posts);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createPost,
  getAllPosts
};
