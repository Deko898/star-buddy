import { Entity, Column, BeforeInsert, ManyToOne, JoinColumn, ManyToMany, OneToMany, OneToOne, RelationId } from 'typeorm';
import { BaseEntity, UserRole } from '../../../../../libs/models';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  IsEmail,
  IsNotEmpty,
  IsOptional
} from 'class-validator';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { Room } from '../room/room.entity';
import { Message } from '../message/message.entity';
import { Image } from '../image/image.entity';
import { Profile } from '../profile/profile.entity';
import { PaymentAccount } from '../payments/payment-account.entity';
import { PaymentIntent } from '../payments/payment-intent.entity';

@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty({ type: String })
  @IsString()
  @Column({ nullable: false })
  @Exclude()
  password: string;

  @ApiProperty({ type: String })
  @IsEmail()
  @IsNotEmpty()
  @Column({ type: String, nullable: false })
  email: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @Column({ type: String, nullable: false })
  phone: string;

  @ApiProperty()
  @IsEnum(UserRole)
  @Column({ enum: UserRole, default: UserRole.Client })
  userRole: number;

  @Column({ type: Boolean, nullable: false, default: false })
  isEmailVerified: boolean;

  @Column({ type: Boolean, nullable: false, default: false })
  isPhoneVerified: boolean;

  @OneToOne(type => Profile, { cascade: ['insert', 'remove'], nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  profile?: Profile;

  @RelationId((user: User) => user.profile)
  readonly profileId?: string;

  @OneToOne(type => PaymentAccount, { cascade: ['insert', 'remove'], nullable: true, onDelete: 'CASCADE' })
  @JoinColumn()
  paymentAccount?: PaymentAccount;

  @RelationId((user: User) => user.profile)
  readonly paymentAccountId?: string;


  @ManyToMany(
    type => Room, (room) => room.participants, { onDelete: 'CASCADE', nullable: true },
  )
  rooms?: Room[];

  @ManyToMany(
    type => Image, (image) => image.screenshots, { onDelete: 'CASCADE', nullable: true },
  )
  screenshots?: Image[];

  @ManyToMany(
    type => PaymentIntent, (paymentIntent) => paymentIntent.users, { onDelete: 'CASCADE', nullable: true },
  )
  payment_intents?: PaymentIntent[];

  @ApiProperty({ type: Message })
  @OneToMany(
    (type) => Message,
    message => message.room
  )
  @JoinColumn()
  messages: Message[];

  @BeforeInsert() async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  // @Expose()
  // get fullName(): string {
  //   return `${this.firstName} ${this.lastName}`;
  // }

}
