import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SchedueleAppointmentCommand } from '../commands';
import { Appointment } from '../appointment.entity';
import { AppointmentService } from '../appointment.service';
import { HttpExceptionFilter } from '../../core/http-exception.filter';


@CommandHandler(SchedueleAppointmentCommand)
export class SchedueleAppointmentHandler implements ICommandHandler<SchedueleAppointmentCommand> {
    constructor(private readonly appointmentService: AppointmentService) { }

    public async execute(command: SchedueleAppointmentCommand): Promise<Appointment> {
        const { input } = command;
        try {
            return await this.appointmentService.create(input);
        } catch (error) {
            throw new HttpExceptionFilter();
        }
    }
}
