import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ChatRoomGateway } from './chat.gateway';

@Module({
    imports: [
        CqrsModule
    ],
    providers: [ChatRoomGateway],
})
export class ChatModule { }