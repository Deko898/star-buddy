import { Entity, Column, ManyToMany, Unique } from 'typeorm';
import { BaseEntity } from '../../../../../libs/models';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty
} from 'class-validator';
import { Star } from '../stars/stars.entity';

@Entity('star_category')
@Unique(['name'])
export class StarCategory extends BaseEntity {

    @ApiProperty({ type: String })
    @IsEmail()
    @IsNotEmpty()
    @Column({ type: String, nullable: false })
    name: String;

    @ManyToMany((type) => Star, (star) => star.categories)
    stars?: Star[];
}