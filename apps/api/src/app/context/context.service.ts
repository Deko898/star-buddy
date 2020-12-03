import {
  Injectable,
  Scope,
  Inject
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ExtractJwt } from 'passport-jwt';

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
  constructor(@Inject(REQUEST) private readonly request: any) { }

  getUserInfoFromJwtToken() {
    return this.request.user;
  }

  getCurrentToken() {
    return ExtractJwt.fromAuthHeaderAsBearerToken()(this.request);
  }
}