import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '../../environments/environment';
import { EmailJwtStrategy } from './email-jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { CoreModule } from '../core/core.module';

@Module({
    imports: [
        UserModule,
        CoreModule,
        JwtModule.register({
            secret: environment.emailSecret,
            signOptions: {
                expiresIn: '1d'
            }
        }),
    ],
    providers: [EmailService],
    exports: [EmailService],
    controllers: []
})
export class EmailModule { }