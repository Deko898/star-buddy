import { ICommand } from '@nestjs/cqrs';
import { FindManyOptions } from 'typeorm';

export class FindMessagesCommand implements ICommand {
    static readonly type = '[MESSAGE] Find Messages';

    constructor(
        public readonly input: FindManyOptions
    ) { }
}
