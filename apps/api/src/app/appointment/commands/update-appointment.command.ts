import { ICommand } from '@nestjs/cqrs';
import { UpdateAppointmentDto } from '../dtos';

export class UpdateAppointmentCommand implements ICommand {
    static readonly type = '[APPOINTMENT] Update';

    constructor(public readonly input: UpdateAppointmentDto) { }
}
