import { Module } from "@nestjs/common";
import { VideoRoomGateway } from "./video-room.gateway";
import { JwtModule } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";
import { RoomService } from "./room.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Room } from "./room.entity";
import { RoomAuth } from "./room-auth.entity";
import { RoomHandlers } from "./handlers";

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Room, RoomAuth]),
    JwtModule.register({
      secret: 'room'
    })
  ],
  providers: [VideoRoomGateway, RoomService, ...RoomHandlers],
  exports: [],
  controllers: []
})
export class RoomModule { }