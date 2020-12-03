import { ICommand } from '@nestjs/cqrs';
import { SchedueleAppointmentDto } from '../dtos';

export class SchedueleAppointmentCommand implements ICommand {
    static readonly type = '[APPOINTMENT] Scheduele';

    constructor(public readonly input: SchedueleAppointmentDto) { }
}
