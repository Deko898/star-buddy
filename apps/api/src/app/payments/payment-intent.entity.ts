import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../../../../libs/models';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from '../user/user.entity';


@Entity('payment_intent')
export class PaymentIntent extends BaseEntity {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @Column({ type: String, nullable: false })
    payment_intent: String;

    @ApiProperty()
    @ManyToMany((type) => User, (user) => user.payment_intents)
    @JoinTable({
        name: 'payment_intents'
    })
    users: User[];
}