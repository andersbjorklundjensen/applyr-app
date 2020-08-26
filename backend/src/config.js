/**
 * Environment variables
 * @type {{}}
 * @name Env variables
 */
module.exports = {
  JWT_SECRET: 'secret',
  PORT: 8000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/database',
};
