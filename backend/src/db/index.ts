import mongoose from 'mongoose';
import config from '../config';

import userModel from './models/users';
import jobModel from './models/jobs';
import backupModel from './models/backups';
import fileModel from './models/files';

export default () => {
  const dbConnection = mongoose.createConnection(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  dbConnection.model('users', userModel);
  dbConnection.model('jobs', jobModel);
  dbConnection.model('backups', backupModel);
  dbConnection.model('files', fileModel);

  return dbConnection;
};
