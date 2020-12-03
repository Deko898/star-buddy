import { ICommand } from '@nestjs/cqrs';
import { FindManyOptions } from 'typeorm';
import { CreateMessageDto } from '../dto';

export class CreateMessageCommand implements ICommand {
    static readonly type = '[MESSAGE] Create Message';

    constructor(
        public readonly input: CreateMessageDto
    ) { }
}
