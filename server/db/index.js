const db = require('./models');

db.connect = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('db is up');
  } catch (err) {
    throw err;
  }
};

module.exports = db;
