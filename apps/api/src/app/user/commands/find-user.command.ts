import { ICommand } from '@nestjs/cqrs';
import { FindOneOptions } from 'typeorm';

export class FindUserCommand implements ICommand {
    static readonly type = '[USER] Fine One';

    constructor(
        public readonly id: string,
        public readonly input?: FindOneOptions
    ) { }
}
