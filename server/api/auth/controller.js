const jwt = require('jsonwebtoken');

const db = require('../../db');

const jwtOptions = {
  expiresIn: '7d'
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const where = { email };

    const user = await db.User.findOne({ where });
    if (!user) {
      throw new Error('Wrong email or password');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Wrong email or password');
    }

    const payload = { userId: user.id };
    const token = jwt.sign(payload, req.app.get('secret'), jwtOptions);

    res.json({ token });
  } catch (err) {
    return next(err);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await db.User.create({ email, password });

    res.json({ user });
  } catch (err) {
    return next(err);
  }
};

const validate = async (req, res, next) => {
  try {
    const { token } = req.body;
    const decoded = await jwt.verify(token, req.app.get('secret'));
    const payload = { userId: decoded.userId };
    const refreshedToken = jwt.sign(payload, req.app.get('secret'), jwtOptions);

    res.json({ token: refreshedToken });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login,
  register,
  validate
};
