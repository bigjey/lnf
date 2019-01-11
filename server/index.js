require('dotenv').load();

const db = require('./db');
const app = require('./app');

(async () => {
  try {
    await db.connect();
    app.start();
  } catch (err) {
    throw err;
  }
})();
