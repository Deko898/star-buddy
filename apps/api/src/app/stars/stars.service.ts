import { Injectable, Inject } from '@nestjs/common';
import { CrudService } from '../core/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Star } from './stars.entity';
import { GetAllStarsDto } from './dtos';
import { OrderType } from '../core/interfaces';

@Injectable()
export class StarsService extends CrudService<Star> {
    constructor(
        @InjectRepository(Star)
        public repo: Repository<Star>
    ) {
        super(repo);
    }

    async getAllStarsPagiantedWithFilterAndOrder({
        page,
        take,
        username = '',
        dateCreated,
        categoryIds,
        isVerified
    }: GetAllStarsDto) {
        const qb = this.repo
            .createQueryBuilder('star')
            .leftJoinAndSelect('star.categories', 'categories')
        if (typeof isVerified === 'boolean') {
            qb.where("star.isVerified = :isVerified", { isVerified })
        }
        if (categoryIds) {
            qb.andWhere('"categories"."id" IN (:...categoryIds)', { categoryIds }) //: ['1977c1a3-7fbf-4626-a52d-288275944e71
        }
        qb
            .leftJoinAndSelect('star.user', 'user')
            .andWhere('LOWER(user.username) LIKE :username', {
                username: `${username.toLowerCase()}%`
            })
        if (dateCreated) {
            qb.orderBy('star.dateCreated', dateCreated === OrderType.ASC ? OrderType.ASC : OrderType.DESC)
        }
        qb
            .skip(page * take)
            .take(take)

        return await qb.getManyAndCount();
    }
}