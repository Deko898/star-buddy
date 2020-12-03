import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { RoomModule } from './room/room.module';
import { StarsModule } from './stars/stars.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { ClientsModule } from './clients/clients.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ImageModule } from './image/image.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    AuthModule,
    CoreModule,
    StarsModule,
    RoomModule,
    ChatModule,
    MessageModule,
    AppointmentModule,
    ClientsModule,
    ImageModule,
    ProfileModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
