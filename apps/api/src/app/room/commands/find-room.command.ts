import { ICommand } from '@nestjs/cqrs';
import { FindOneOptions } from 'typeorm';

export class FindRoomCommand implements ICommand {
    static readonly type = '[ROOM] Find Room';

    constructor(
        public readonly id: string,
        public readonly input?: FindOneOptions
    ) { }
}
