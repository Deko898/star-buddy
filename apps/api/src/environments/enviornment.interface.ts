import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CloudinaryConfig } from '../app/cloudinary/interfaces';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * environment variables that goes into process.env
 */
export interface Env {
    LOG_LEVEL?: LogLevel;
    [key: string]: string;
}

/**
 * Server Environment
 */
export interface IEnvironment {
    production: boolean;
    envName: string;
    env?: Env;
    ALLOW_WHITE_LIST?: Array<string>;
    jwtSecret: string,
    emailSecret: string,
    stripe_key: string,
    server: {
        host: string;
        domainUrl: string;
        port: string | number;
        globalPrefix: string;
    };

    db: TypeOrmModuleOptions;
    auth?: {
        clientId: string;
        issuerExternalUrl: string;
        issuerInternalUrl?: string;
        jwksUri?: string;
        additionalQueryStringParams?: Partial<{
            scope: string;
            nonce: string;
            audience: string;
            [key: string]: string;
        }>;
    };

    weather?: {
        baseUrl: string;
        apiKey: string;
    };

    webPush?: {
        subject: string;
        publicKey: string;
        privateKey: string;
    };

    cloudinaryConfig: CloudinaryConfig
}