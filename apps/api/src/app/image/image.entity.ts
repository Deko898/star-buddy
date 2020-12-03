import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, Length, MaxLength, IsNumber, IsString } from 'class-validator';
import { Column, CreateDateColumn, Entity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity, ImageType } from '../../../../../libs/models';
import { User } from '../user/user.entity';

@Entity('image')
export class Image extends BaseEntity {
    @Length(1, 100)
    @Column({ length: 100 })
    title: string;

    @Column({ type: 'enum', enum: ImageType, default: ImageType.Profile })
    @IsEnum(ImageType)
    type: ImageType;

    @ApiProperty()
    @ManyToMany((type) => User, (user) => user.screenshots)
    @JoinTable({
        name: 'screenshots'
    })
    screenshots: User[];

    @IsOptional()
    @Column({ nullable: true })
    checksum?: string;

    @IsOptional()
    @Column({ nullable: true })
    original_filename: string;

    @IsOptional()
    @Column({ nullable: true })
    size?: number;

    @ApiProperty()
    @MaxLength(500)
    @Column({ length: 500, nullable: true })
    url: string;

    @IsString()
    @Column({ nullable: false })
    @ApiProperty()
    cloud_id: string;

    @IsString()
    signature: string;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Column({ type: Number, nullable: true })
    width: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    @Column({ type: Number, nullable: true })
    height: number;
}
