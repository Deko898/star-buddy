import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmailModule } from '../email/email.module';
import { TwilioModule } from '../twilio/twilio.module';
import { ContextModule } from '../context/context.module';

@Module({
  imports: [
    UserModule,
    EmailModule,
    ContextModule,
    JwtModule.register({
      secret: environment.jwtSecret,
      signOptions: {
        expiresIn: '50d'
      }
    }),
    TwilioModule.register({
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN
    }),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthModule],
  controllers: [AuthController]
})
export class AuthModule { }