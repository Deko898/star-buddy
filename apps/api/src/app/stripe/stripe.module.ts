import { Module } from '@nestjs/common';
import { StripeModule } from 'nestjs-stripe';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { StripeService } from './stripe.service';

@Module({
    imports: [
        ConfigModule,
        StripeModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) =>
                configService.getStripeConfig()
        }),
    ],
    providers: [StripeService],
    exports: [StripeService]
})
export class StripeProviderModule { }