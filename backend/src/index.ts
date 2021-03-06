import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRouter from './routes/user';
import jobRouter from './routes/job';
import filesRouter from './routes/files';
import backupRouter from './routes/backup';
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
  app.use(jobRouter);
  app.use(filesRouter);
  app.use(backupRouter);

  return app;
};
