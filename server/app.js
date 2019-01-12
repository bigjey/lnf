const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.set('secret', process.env.SECRET);

app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
  require('./utils/setupApiDocs')(app);
}

app.use('/auth', require('./api/auth'));
app.use('/api', require('./api'));

app.use(require('./utils/errorHandler'));

app.start = () => {
  app.listen(process.env.PORT, () => {
    console.log(`app is running at http://localhost:${process.env.PORT}`);
  });
};

module.exports = app;
