import { Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Exclude()
    @ApiProperty({ type: 'string', format: 'date-time', example: '2018-11-21T06:20:32.232Z' })
    @CreateDateColumn({ select: false, type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    dateCreated: Date;

    @Exclude()
    @ApiProperty({ type: 'string', format: 'date-time', example: '2018-11-21T06:20:32.232Z' })
    @CreateDateColumn({ select: false, type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    dateUpdated?: Date;
}