import { Entity, OneToOne, JoinColumn, ManyToMany, JoinTable, Column, RelationId, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../../../libs/models';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty, IsBoolean
} from 'class-validator';
import { User } from '../user/user.entity';
import { StarCategory } from '../stars-category/stars-category.entity';
import { Appointment } from '../appointment/appointment.entity';

@Entity('star')
export class Star extends BaseEntity {
    @ApiProperty({ type: User })
    @OneToOne((type) => User, {
        nullable: false,
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    user: User;

    @RelationId((star: Star) => star.user)
    readonly userId?: string;

    @ApiProperty()
    @IsNotEmpty()
    @ManyToMany((type) => StarCategory, (starCategory) => starCategory.stars)
    @JoinTable({
        name: 'star_categories'
    })
    categories: StarCategory[];

    @ApiProperty({ type: String })
    @IsBoolean()
    @IsNotEmpty()
    @Column({ type: Boolean, nullable: false, default: false })
    isVerified: Boolean;

    @ApiProperty({ type: Appointment })
    @OneToMany(
        (type) => Appointment,
        appointment => appointment.requestedFor
    )
    @JoinColumn()
    appointments: Appointment[];
}