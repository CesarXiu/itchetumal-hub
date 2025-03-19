import * as Minio from 'minio';
import { env } from 'process';

const minioClient = new Minio.Client({
    endPoint: env.MINIO_ENDPOINT || 'localhost',
    port: env.MINIO_PORT ? parseInt(env.MINIO_PORT, 10) : 9000,
    useSSL: false,
    accessKey: env.MINIO_ACCESS_KEY,
    secretKey: env.MINIO_SECRET_KEY,
});

export { minioClient };