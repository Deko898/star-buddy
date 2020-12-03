import { ICommand } from '@nestjs/cqrs';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { User } from '../user.entity';

export class UpdateUserCommand implements ICommand {
    static readonly type = '[USER] Update';

    constructor(
        public readonly id: string,
        public readonly partialEntity: QueryDeepPartialEntity<User>,
        public readonly options?: any[]
    ) { }
}
