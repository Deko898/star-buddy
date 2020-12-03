import { IEnvironment } from "./enviornment.interface";

export const environment: IEnvironment = {
  production: false,
  envName: 'dev',
  stripe_key: 'sk_test_51HZLm1I6J6TttJpLaN0sFhzCa0tRcMyF1zt9bV2hUlbAu2gwqQjtizR64niQMgWI0slqnT9r1URrEyrUxZGoFEaz00dtGnPtah',
  env: {
    LOG_LEVEL: 'debug',
    NODE_TLS_REJECT_UNAUTHORIZED: '0',
  },
  ALLOW_WHITE_LIST: ['::ffff:127.0.0.1', '::1'],
  jwtSecret: 'star_buddy_asd',
  emailSecret: 'email_secret',
  server: {
    host: '0.0.0.0',
    domainUrl: 'http://localhost:4000',
    port: 3000,
    globalPrefix: '/api',
  },
  db: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'star_buddy',
    username: 'postgres',
    password: 'root',
    keepConnectionAlive: true,
    logging: true,
    synchronize: true,
    uuidExtension: 'pgcrypto',
    autoLoadEntities: true
  },
  cloudinaryConfig: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  }
};