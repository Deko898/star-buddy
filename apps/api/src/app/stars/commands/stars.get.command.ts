import { ICommand } from '@nestjs/cqrs';
import { GetAllStarsDto } from '../dtos/get-all-stars.dto';

export class StarsGetCommand implements ICommand {
    static readonly type = '[STARS] Get All';

    constructor(public readonly input: GetAllStarsDto) { }
}
