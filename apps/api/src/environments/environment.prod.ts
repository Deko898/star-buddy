import { IEnvironment } from "./enviornment.interface";

export const environment: IEnvironment = {
  production: true,
  envName: 'prod',
  jwtSecret: process.env.SECRETKEY || 'star_buddy_asd',
  emailSecret: process.env.EMAIL_SECRET_KEY || 'email_secret',
  stripe_key: 'sk_test_51HZLm1I6J6TttJpLaN0sFhzCa0tRcMyF1zt9bV2hUlbAu2gwqQjtizR64niQMgWI0slqnT9r1URrEyrUxZGoFEaz00dtGnPtah',
  env: {
    NODE_TLS_REJECT_UNAUTHORIZED: '0',
  },

  server: {
    host: process.env.HOST || '0.0.0.0',
    domainUrl: process.env.DOMAIN_URL || 'http://localhost:4000',
    port: process.env.PORT || 4000,
    globalPrefix: '/api',
  },

  db: {
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'ngxdb-postgresql',
    port: process.env.TYPEORM_PORT ? Number(process.env.TYPEORM_PORT) : 5432,
    database: process.env.TYPEORM_DATABASE || 'star_buddy',
    username: process.env.TYPEORM_USERNAME || 'postgres',
    password: process.env.TYPEORM_PASSWORD || 'root',
    keepConnectionAlive: true,
    logging: process.env.TYPEORM_LOGGING ? JSON.parse(process.env.TYPEORM_LOGGING) : false,
    synchronize: process.env.TYPEORM_SYNCHRONIZE ? JSON.parse(process.env.TYPEORM_SYNCHRONIZE) : false,
    uuidExtension: 'pgcrypto',
    autoLoadEntities: true
  },
  cloudinaryConfig: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  }
};