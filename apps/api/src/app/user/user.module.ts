
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CommandHandlers } from './handlers';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        CqrsModule
    ],
    providers: [UserService, ...CommandHandlers],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }