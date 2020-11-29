
module.exports = {
  JWT_SECRET: 'secret',
  PORT: process.env.BACKEND_PORT,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/database',
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY,
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY,
  MINIO_PORT: process.env.MINIO_PORT,
  IP_ADDRESS: process.env.IP_ADDRESS,
};
