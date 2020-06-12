const mongoose = require('mongoose');

const userModel = require('./models/users');
const jobModel = require('./models/jobs');
const backupModel = require('./models/backups');

module.exports = () => {
  const dbConnection = mongoose
    .createConnection(
      'mongodb://localhost:27017/database',
      { useNewUrlParser: true, useUnifiedTopology: true },
    );

  dbConnection.model('users', userModel);
  dbConnection.model('jobs', jobModel);
  dbConnection.model('backups', backupModel);

  return dbConnection;
};
