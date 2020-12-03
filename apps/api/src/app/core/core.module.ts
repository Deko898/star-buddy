import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { ConfigModule } from '../config/config.module';
import { User } from '../user/user.entity';
import { Star } from '../stars/stars.entity';
import { StarCategory } from '../stars-category/stars-category.entity';
import { environment } from '../../environments/environment';
import { interceptors } from './interceptors';
import { Room } from '../room/room.entity';
import { Message } from '../message/message.entity';
import { Client } from '../clients/client.entity';
import { Appointment } from '../appointment/appointment.entity';
import { RoomAuth } from '../room/room-auth.entity';
import { Image } from '../image/image.entity';
import { Profile } from '../profile/profile.entity';
import { RequestContextMiddleware } from './middlewares/request-context.middleware';
import { PaymentAccount } from '../payments/payment-account.entity';
import { PaymentIntent } from '../payments/payment-intent.entity';

// FIXME: temp workaround https://github.com/nrwl/nx/pull/1233
// import { isClass } from '@ngx-starter-kit/utils';
export function isClass(obj) {
  return !!obj.prototype && !!obj.prototype.constructor.name;
}

function requireAllClasses(rc) {
  return rc
    .keys()
    .flatMap(key => (<any>Object).values(rc(key)))
    .filter(isClass);
}

const entities = [
  User,
  Star,
  StarCategory,
  Room,
  Message,
  Client,
  Appointment,
  RoomAuth,
  Image,
  Profile,
  PaymentAccount,
  PaymentIntent
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => ({
        ...environment.db,
        autoLoadEntities: true,
        entities
        // subscribers,
        // migrations,
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
  exports: []
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}