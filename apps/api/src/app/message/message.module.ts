import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./message.entity";
import { MessageService } from "./message.service";
import { MessageCommandHandlers } from "./handlers";

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([Message])
    ],
    providers: [MessageService, ...MessageCommandHandlers],
    exports: [],
    controllers: []
})
export class MessageModule { }