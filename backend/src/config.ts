export default {
  JWT_SECRET: 'secret',
  PORT: process.env.BACKEND_PORT as string,
  MONGO_URI: process.env.MONGO_URI as string,
  MINIO_ACCESS_KEY: process.env.MINIO_ACCESS_KEY as string,
  MINIO_SECRET_KEY: process.env.MINIO_SECRET_KEY as string,
  MINIO_PORT: parseInt(process.env.MINIO_PORT as string),
  MINIO_HOST: process.env.MINIO_HOST as string,
};
