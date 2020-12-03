import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards, OnModuleInit } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { WsRoomGuard } from '../core/guards';
import { JoinRoomDto } from '../room/dto';
import { FindMessagesCommand, CreateMessageCommand } from '../message/commands';
import { GetRoomMessagesDto, CreateMessageDto } from '../message/dto';
import { FindRoomCommand } from '../room/commands/find-room.command';
import { DateUtils } from '../../../../../libs/common/src/lib/date-utils';

@WebSocketGateway({ namespace: 'chat-room' })
export class ChatRoomGateway implements OnModuleInit, OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;

    constructor(
        private readonly commandBus: CommandBus,
    ) { }

    onModuleInit() {
        console.log('MODULE INIT');
    }

    async handleConnection(client: Socket, req: Request) {
        const userId = client.handshake.query.userId;
        const roomId = client.handshake.query.roomId;

        if (!userId) {
            throw new WsException('No permission');
        }

        if (!roomId) {
            throw new WsException('Room doesent exist');
        }

        try {
            const room = await this.commandBus.execute(new FindRoomCommand(roomId, { relations: ['participants'] }));

            const isParticipant = room.participants.find(p => p.id === userId);

            if (!isParticipant) {
                throw new WsException('No permission');
            }

            if (DateUtils.isBefore(room.startDate)) {
                throw new WsException('Youre trying to access meeting in the past');
            }

            client.emit('connectedToRoom', room.participants);
        }
        catch (error) {
            throw new WsException(error.message)
        }
    }

    @UseGuards(WsRoomGuard)
    @SubscribeMessage('msgToServer')
    async handleMsgToServer(@ConnectedSocket() client: Socket, @MessageBody() data: CreateMessageDto) {
        try {
            const createMsgDto = new CreateMessageDto(data);

            const message = await this.commandBus.execute(
                new CreateMessageCommand(createMsgDto)
            );

            this.server.to(data.roomId).emit('msgToClient', message);

            return { event, data };
        } catch (error) {
            throw new WsException(error.message)
        }
    }

    @UseGuards(WsRoomGuard)
    @SubscribeMessage('joinRoom')
    async handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() joinRoomDto: JoinRoomDto) {
        client.join(joinRoomDto.roomId);

        try {
            const findMessageDto = new GetRoomMessagesDto({ roomId: joinRoomDto.roomId });

            const messages = await this.commandBus.execute(new FindMessagesCommand(
                {
                    skip: findMessageDto.page,
                    take: findMessageDto.take,
                    where: {
                        roomId: findMessageDto.roomId
                    },
                    relations: ['user']
                }));

            client.emit('messages', messages);
        } catch (error) {
            throw new WsException(error.message)
        }
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() roomId: string) {
        client.leave(roomId)
    }

    async handleDisconnect(client: any) {
        this.server.emit('clientDisconnect');
    }
}