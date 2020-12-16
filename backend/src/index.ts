const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import userRouter from './routes/user';

export default () => {
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
  app.use(userRouter);
  app.use(require('./routes/job'));
  app.use(require('./routes/files'));
  app.use(require('./routes/backup'));

  return app;
};
