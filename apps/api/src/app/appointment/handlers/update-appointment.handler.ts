import { CommandHandler, ICommandHandler, CommandBus } from '@nestjs/cqrs';
import { UpdateAppointmentCommand } from '../commands';
import { Appointment } from '../appointment.entity';
import { AppointmentService } from '../appointment.service';
import { HttpExceptionFilter } from '../../core/http-exception.filter';
import { UpdateResult } from 'typeorm';
import { AppointmentStatus } from '../../../../../../libs/models/appointment';
import { CreateRoomCommand } from '../../room/commands';
import { CreateRoomDto } from '../../room/dto';


@CommandHandler(UpdateAppointmentCommand)
export class UpdateAppointmentHandler implements ICommandHandler<UpdateAppointmentCommand> {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly appointmentService: AppointmentService
    ) { }

    public async execute(command: UpdateAppointmentCommand): Promise<UpdateResult | Appointment> {
        const { input } = command;

        try {
            const appointment: Appointment = await this.appointmentService.findOne(input.appointmentId, { relations: ['requestedBy', 'requestedFor'] });

            if (appointment.requestedForId !== input.requestedForId) {
                throw new HttpExceptionFilter();
            }

            if (input.status === AppointmentStatus.APPROVED) {
                // save calendar slot
                // send nottifications
                const createRoomDto = new CreateRoomDto({
                    requestedByUserId: appointment.requestedBy.userId,
                    requestedForUserId: appointment.requestedFor.userId,
                    startDate: appointment.schedueledDate
                })
                const room = await this.commandBus.execute(new CreateRoomCommand(createRoomDto));
                // const token = await this.jwtService.signAsync({ id: user.id });
            }

            return await this.appointmentService.update(input.appointmentId, {
                status: input.status
            });
        } catch (error) {
            throw new HttpExceptionFilter()
        }


    }
}
