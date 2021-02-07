const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
import userRouter from './routes/user';
import initDb from './db';

export default () => {
  const app = express();
  const db = initDb();

  app.use(express.static('screenshots'));

  app.use(cors());

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
