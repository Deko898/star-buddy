import { Module } from "@nestjs/common";
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Appointment } from "./appointment.entity";
import { AppointmentController } from "./appointment.controller";
import { AppointmentService } from "./appointment.service";
import { AppointmentHandlers } from "./handlers";

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    CqrsModule
  ],
  providers: [AppointmentService, ...AppointmentHandlers],
  exports: [],
  controllers: [AppointmentController]
})
export class AppointmentModule { }