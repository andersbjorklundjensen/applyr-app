const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = () => {
  const app = express();

  app.use(express.static('screenshots'));

  app.use(cors());

  const db = require('./db')();
  app.locals.db = db;

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  // routes
  app.use(require('./routes/user'));
  app.use(require('./routes/job'));
  app.use(require('./routes/upload'));
  app.use(require('./routes/backup'));

  return app;
};
