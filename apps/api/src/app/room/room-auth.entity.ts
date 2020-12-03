import { Entity, Column, Index, PrimaryColumn, OneToOne, JoinColumn, RelationId } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Room } from './room.entity';

@Entity('room_auth')
export class RoomAuth {
    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    @PrimaryColumn({ name: 'access_token' })
    // @Column({ type: String, nullable: false })
    access_token: String;

    @ApiProperty({ type: Room })
    @OneToOne((type) => Room, {
        nullable: false,
        cascade: true,
        onDelete: 'CASCADE'
    })
    @IsNotEmpty()
    @JoinColumn()
    room?: Room;

    @RelationId((roomAuth: RoomAuth) => roomAuth.room)
    readonly roomId?: string;
}
