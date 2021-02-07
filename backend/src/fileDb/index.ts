import minio from 'minio';
import config from '../config';

export default () => {
  return new minio.Client({
    endPoint: config.MINIO_HOST,
    port: parseInt(config.MINIO_PORT),
    accessKey: config.MINIO_ACCESS_KEY,
    secretKey: config.MINIO_SECRET_KEY,
    useSSL: false,
  });
};
