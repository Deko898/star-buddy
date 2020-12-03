import { Entity, ManyToOne, JoinColumn, Column, RelationId } from 'typeorm';
import { BaseEntity } from '../../../../../libs/models';
import { User } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Room } from '../room/room.entity';

@Entity()
export class Message extends BaseEntity {

    @ApiProperty({ type: User })
    @IsNotEmpty()
    @ManyToOne(
        (type) => User,
        { nullable: false, onDelete: 'CASCADE' },
    )
    @JoinColumn()
    user: User;

    @ApiProperty({ type: String, readOnly: false })
    @RelationId((message: Message) => message.user)
	@IsString()
	@Column({ nullable: false })
	readonly userId?: string;

    @ApiProperty({ type: Room })
    @IsNotEmpty()
    @ManyToOne(
        type => Room,
        { onDelete: 'CASCADE', nullable: false },
    )
    @JoinColumn()
    room: Room;

    @ApiProperty({ type: String, readOnly: false })
    @RelationId((message: Message) => message.room)
	@IsString()
	@Column({ nullable: false })
	readonly roomId?: string;

    @ApiProperty({ type: String })
    @Column({ nullable: false })
    @IsNotEmpty()
    content: String;
}