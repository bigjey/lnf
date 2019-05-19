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

const ORDER_FIELDS = ['createdAt'];
const ORDER_DIRECTIONS = ['desc', 'asc'];
const POSTS_PER_PAGE = 2;

const getAllPosts = async (req, res, next) => {
  try {
    const { userId, order: orderValue, page = 1, breed, gender } = req.query;

    let p = parseInt(page, 10);
    if (Number.isNaN(p) || p < 1) {
      throw new Error('page param must be a positive integer');
    }

    const criteria = {};

    let order = ['createdAt', 'desc'];
    const limit = POSTS_PER_PAGE;
    const offset = (page - 1) * POSTS_PER_PAGE;

    if (userId) {
      criteria.userId = userId;
    }

    if (breed) {
      criteria.breed = breed;
    }

    if (gender) {
      criteria.gender = gender;
    }

    if (orderValue) {
      let [f, d] = orderValue.split('_');
      if (ORDER_FIELDS.includes(f) && ORDER_DIRECTIONS.includes(d)) {
        order = [f, d];
      }
    }

    const { count, rows: posts } = await db.Post.findAndCountAll({
      where: criteria,
      order: [order],
      limit,
      offset,
    });

    res.set('x-total', count);
    res.set('x-page-size', POSTS_PER_PAGE);

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
