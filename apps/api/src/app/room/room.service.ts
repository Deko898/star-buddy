import { Injectable } from '@nestjs/common';
import { CrudService } from '../core/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomService extends CrudService<Room> {
    constructor(
        @InjectRepository(Room)
        public repo: Repository<Room>
    ) {
        super(repo);
    }
}