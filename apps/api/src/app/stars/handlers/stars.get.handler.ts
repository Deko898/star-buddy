import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { StarsGetCommand } from '../commands';
import { StarsService } from '../stars.service';
import { Star } from '../stars.entity';
import { IPagination, OrderType } from '../../core/interfaces';
import { StarCategory } from '../../stars-category/stars-category.entity';
import { In } from 'typeorm';
import { GetAllStarsDto } from '../dtos';


@CommandHandler(StarsGetCommand)
export class StarsGetHandler implements ICommandHandler<StarsGetCommand> {
    constructor(private readonly starsService: StarsService) { }

    public async execute(command: StarsGetCommand): Promise<IPagination<Star>> {
        const { input } = command;
        
        const [items, total] = await this.starsService.getAllStarsPagiantedWithFilterAndOrder(input);

        return { items, total }

    }
}
