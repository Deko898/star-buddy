import { Entity, JoinColumn, Column, OneToOne, RelationId, AfterUpdate, getRepository, ManyToOne } from 'typeorm';
import { BaseEntity, UserRole } from '../../../../../libs/models';
import { IsEnum, IsDate, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppointmentStatus } from '../../../../../libs/models/appointment';
import { Client } from '../clients/client.entity';
import { Star } from '../stars/stars.entity';

@Entity()
export class Appointment extends BaseEntity {
    @ApiProperty({ type: 'timestamp' })
    @IsDate()
    @IsNotEmpty()
    @Column({ type: 'timestamp' })
    schedueledDate: string;

    @ApiProperty({ type: Client })
    @IsNotEmpty()
    @ManyToOne(
        type => Client,
        { onDelete: 'CASCADE', nullable: false },
    )
    @JoinColumn()
    requestedBy: Client;

    @ApiProperty({ type: String, readOnly: false })
    @IsString()
    @RelationId((appointment: Appointment) => appointment.requestedBy)
	@Column({ nullable: false })
    readonly requestedById?: string;

    // @OneToOne(type => Client, { cascade: ['insert', 'remove'], nullable: false })
    // @IsNotEmpty()
    // @JoinColumn()
    // requestedBy?: Client;

    // @RelationId((appointment: Appointment) => appointment.requestedBy)
    // readonly requestedById?: string;

    // @OneToOne(type => Star, { cascade: ['insert', 'remove'], nullable: false })
    // @IsNotEmpty()
    // @JoinColumn()
    // requestedFor?: Star;

    // @RelationId((appointment: Appointment) => appointment.requestedFor)
    // readonly requestedForId?: string;


    @ApiProperty({ type: Star })
    @IsNotEmpty()
    @ManyToOne(
        type => Star,
        { onDelete: 'CASCADE', nullable: false },
    )
    @JoinColumn()
    requestedFor: Star;

    @ApiProperty({ type: String, readOnly: false })
    @IsString()
    @RelationId((appointment: Appointment) => appointment.requestedFor)
	@Column({ nullable: false })
    readonly requestedForId?: string;
    
    @ApiProperty()
    @IsEnum(AppointmentStatus)
    @Column({ enum: AppointmentStatus, default: AppointmentStatus.PENDING })
    status: string;
}
