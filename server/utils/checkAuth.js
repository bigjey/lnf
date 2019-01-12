const jwt = require('jsonwebtoken');

const db = require('../db');

const checkAuth = async (req, res, next) => {
  try {
    let token =
      req.body.authToken || req.query.authToken || req.headers['authorization'];

    if (!token) {
      throw new Error('No auth token');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    const decoded = await jwt.verify(token, req.app.get('secret'));

    const user = await db.User.findByPk(decoded.userId);
    if (!user) {
      throw new Error('No user data');
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401);

    return next(err);
  }
};

module.exports = checkAuth;
