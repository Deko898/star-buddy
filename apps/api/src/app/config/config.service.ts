import { Injectable, Logger } from '@nestjs/common';

import axios from 'axios';
import { environment } from '../../environments/environment';
import { IEnvironment } from '../../environments/enviornment.interface';
import { StripeOptions } from 'nestjs-stripe';

// tslint:disable-next-line
const packageJson = require('../../../../../package.json');

@Injectable()
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  private readonly config = environment;

  constructor() {
    for (const [key, value] of (<any>Object).entries(environment.env)) {
      process.env[key] = value;
    }
    console.log('is prod? ', environment.production);
  }

  get(key: keyof IEnvironment): IEnvironment[keyof IEnvironment] {
    return this.config[key];
  }

  getStripeConfig(): StripeOptions {
    console.log(environment.stripe_key,'environment.stripe_key')
    return {
      apiKey: environment.stripe_key,
      apiVersion: '2020-08-27'
    };
  }

  getVersion(): string {
    if (!process.env.APP_VERSION) {
      process.env.APP_VERSION = packageJson.version;
    }
    return process.env.APP_VERSION;
  }

  isProd(): boolean {
    return this.config.production;
  }

  getAllowWhitelist(): string[] {
    return this.config.ALLOW_WHITE_LIST ? this.config.ALLOW_WHITE_LIST : [];
  }

  async getOpenIdConfiguration() {
    try {
      const response = await axios.get(`${this.config.auth.issuerExternalUrl}/.well-known/openid-configuration`);
      return response.data;
    } catch (err) {
      this.logger.error(
        `Unable to fetch config from ${
        this.config.auth.issuerExternalUrl
        }/.well-known/openid-configuration, \nError: ${err}`,
      );
      this.logger.error('Check if OIDC Server is UP');
    }
  }

  getAuth() {
    return this.config.auth;
  }
}