import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity, Gender } from '../../../../../libs/models';
import { Image } from '../image/image.entity';
import { IsString, IsOptional } from 'class-validator';


@Entity('profile')
export class Profile extends BaseEntity {
    @OneToOne(_ => Image, { cascade: ['insert', 'update'], eager: true, nullable: true, onDelete: 'SET NULL' })
    @JoinColumn()
    avatar?: Image;

    @Column({ type: 'enum', enum: Gender, default: Gender.UNKNOW })
    gender?: Gender = Gender.UNKNOW;
}
