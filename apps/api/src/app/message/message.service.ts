import { Injectable } from '@nestjs/common';
import { CrudService } from '../core/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService extends CrudService<Message> {
    constructor(
        @InjectRepository(Message)
        public repo: Repository<Message>
    ) {
        super(repo);
    }
}