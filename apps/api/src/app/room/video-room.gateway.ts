import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { from, Observable } from 'rxjs';
import { UseGuards } from '@nestjs/common';
import { WsRoomGuard } from '../core/guards';

// { namespace: 'rooms' }
@WebSocketGateway({ namespace: 'video-room' })
export class VideoRoomGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    connectedUsers: number = 0;

    // @UseGuards(RoomGuard)
    async handleConnection(client: Socket, req: Request) {
        // console.log(client.handshake.query.token, 'token')
        // console.log(client,'CL')
        console.log(client.handshake.query.token, 'token')
        this.connectedUsers++;
        this.server.emit('connectedUsers', this.connectedUsers);
    }

    @UseGuards(WsRoomGuard)
    @SubscribeMessage('msgToServer')
    handleMsgToServer(@ConnectedSocket() client: Socket, @MessageBody() data: { roomId: string, message: string, senderId: string }): void {
        // await this.roomService.addMessage(data.userId, data.roomId);
        // client.broadcast.emit('test', data);
        console.log(data, 'data')
        this.server.to(data.roomId).emit('msgToClient', data.message);
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() roomId: string) {
        client.join(roomId)
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(@ConnectedSocket() client: Socket, @MessageBody() roomId: string) {
        client.leave(roomId)
    }


    // @SubscribeMessage('join')
    // async onRoomJoin(client: Socket, data: any): Promise<any> {
    //     // client.join(data[0]);

    // }

    // @SubscribeMessage('leave')
    // onRoomLeave(client, data: any): void {
    //     // client.leave(data[0]);
    // }

    async handleDisconnect(client: any) {
        // A client has disconnected
        this.connectedUsers--;

        // Notify connected clients of current connectedUsers
        console.log('handle disc')
        this.server.emit('connectedUsers', this.connectedUsers);
    }
}