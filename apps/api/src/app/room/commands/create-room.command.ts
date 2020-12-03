import { ICommand } from '@nestjs/cqrs';
import { CreateRoomDto } from '../dto';

export class CreateRoomCommand implements ICommand {
    static readonly type = '[ROOM] Create Room';

    constructor(
        public readonly input: CreateRoomDto
    ) { }
}
