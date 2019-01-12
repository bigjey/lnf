const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./mergeSwaggerDoc');

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};
