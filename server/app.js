const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const app = express();

app.set('secret', process.env.SECRET);
app.set('baseUrl', `http://localhost:${process.env.PORT}`)

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false, limit: 20 * 1024 * 1024 }));
app.use(bodyParser.json({ limit: 20 * 1024 * 1024}));

if (process.env.NODE_ENV !== 'production') {
  require('./utils/setupApiDocs')(app);
}

app.use('/auth', require('./api/auth'));
app.use('/api', require('./api'));

app.use(express.static('uploads'));

app.use(require('./utils/errorHandler'));

app.start = () => {
  app.listen(process.env.PORT, () => {
    console.log(`app is running at ${app.get('baseUrl')}`);
  });
};

module.exports = app;
