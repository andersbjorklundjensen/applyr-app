import { Client } from 'minio';
import config from '../config';

export default () => {
  return new Client({
    endPoint: config.MINIO_HOST,
    port: config.MINIO_PORT,
    accessKey: config.MINIO_ACCESS_KEY,
    secretKey: config.MINIO_SECRET_KEY,
    useSSL: false,
  });
};
