const mongoose = require('mongoose');
const config = require('../config');

const userModel = require('./models/users');
const jobModel = require('./models/jobs');
const backupModel = require('./models/backups');
const fileModel = require('./models/files');

module.exports = () => {
  const dbConnection = mongoose
    .createConnection(
      config.MONGO_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );

  dbConnection.model('users', userModel);
  dbConnection.model('jobs', jobModel);
  dbConnection.model('backups', backupModel);
  dbConnection.model('files', fileModel);

  return dbConnection;
};
