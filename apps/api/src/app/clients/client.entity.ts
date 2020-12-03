import { Entity, OneToOne, JoinColumn, Column, RelationId, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../../../libs/models';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty, IsBoolean
} from 'class-validator';
import { User } from '../user/user.entity';
import { Appointment } from '../appointment/appointment.entity';

@Entity('client')
export class Client extends BaseEntity {
    @ApiProperty({ type: User })
    @OneToOne((type) => User, {
        nullable: false,
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    user: User;

    @RelationId((client: Client) => client.user)
    readonly userId?: string;

    @ApiProperty({ type: String })
    @IsBoolean()
    @IsNotEmpty()
    @Column({ type: Boolean, nullable: false, default: false })
    isPaymentVerified: Boolean;

    
    @ApiProperty({ type: Appointment })
    @OneToMany(
        (type) => Appointment,
        appointment => appointment.requestedBy
    )
    @JoinColumn()
    appointments: Appointment[];
}