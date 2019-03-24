const db = require('../../db');
const { saveImageToFile } = require('../../utils/saveImageToFile');

const createPost = async (req, res, next) => {
  try {
    const { breed, gender, description, image: base64, lat, lng } = req.body;
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
      userId: id,
      lat,
      lng,
    });

    res.json(post);
  } catch (err) {
    console.log('err', err);
    return next(err);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const { userId } = req.query;

    const criteria = {};

    if (userId) {
      criteria.userId = userId;
    }

    const posts = await db.Post.findAll({ where: criteria });

    posts.forEach(p => {
      if (p.image) {
        p.image = `${req.app.get('baseUrl')}/${p.image}`;
      }
    });

    res.json(posts);
  } catch (err) {
    return next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userId } = req.user;

    const post = await db.Post.findByPk(id);

    if (!post) {
      return res.status(400).end();
    }

    if (post.userId !== userId) {
      return res.status(403).end();
    }

    await post.destroy();

    return res.end();
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  deletePost,
};
