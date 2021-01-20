
const Minio = require('minio')
const config = require('../config');

module.exports = () => {
  return new Minio.Client({
    endPoint: config.MINIO_HOST,
    port: parseInt(config.MINIO_PORT),
    accessKey: config.MINIO_ACCESS_KEY,
    secretKey: config.MINIO_SECRET_KEY,
    useSSL: false
  });
}
