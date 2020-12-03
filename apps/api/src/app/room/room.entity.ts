import { Entity, OneToMany, JoinColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToOne, RelationId } from 'typeorm';
import { BaseEntity } from '../../../../../libs/models';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Message } from '../message/message.entity';
import { IsDate, IsOptional, IsNotEmpty } from 'class-validator';
import { RoomAuth } from './room-auth.entity';

@Entity()
export class Room extends BaseEntity {
    @ApiProperty({ type: 'timestamp' })
    @IsDate()
    @IsNotEmpty()
    @Column({ type: 'timestamp', nullable: false })
    startDate: string;

    @ApiProperty({ type: Date })
    @IsDate()
    @IsOptional()
    @Column({ type: 'timestamp', nullable: true })
    finishedAt?: Date;

    @ApiProperty()
    @IsNotEmpty()
    @ManyToMany((type) => User, (user) => user.rooms)
    @JoinTable({
        name: 'participants'
    })
    participants: User[];

    @ApiProperty({ type: Message })
    @OneToMany(
        (type) => Message,
        message => message.room
    )
    @JoinColumn()
    messages: Message[];
}
