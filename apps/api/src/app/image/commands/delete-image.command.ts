import { ICommand } from '@nestjs/cqrs';
import { FindConditions } from 'typeorm';
import { Image } from '../image.entity';

export class DeleteImageCommand implements ICommand {
    static readonly type = '[IMAGE] Delete';

    constructor(
        public readonly input: string | number | FindConditions<Image>
    ) { }
}
