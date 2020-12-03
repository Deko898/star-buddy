import { Entity, Column, ManyToMany, Unique } from 'typeorm';
import { BaseEntity } from '../../../../../libs/models';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


@Entity('payment_account')
export class PaymentAccount extends BaseEntity {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @Column({ type: String, nullable: false })
    payment_provider_account_id: String;
}