const express = require('express');

const app = express();

app.use('*', (req, res) => {
  res.send('ok');
});

app.start = () => {
  app.listen(process.env.PORT, () => {
    console.log(`app is running at http://localhost:${process.env.PORT}`);
  });
};

module.exports = app;
