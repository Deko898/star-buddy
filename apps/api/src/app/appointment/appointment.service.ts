import { Injectable } from '@nestjs/common';
import { CrudService } from '../core/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentService extends CrudService<Appointment> {
    constructor(
        @InjectRepository(Appointment)
        public repo: Repository<Appointment>
    ) {
        super(repo);
    }
}