import {
    Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrudService } from '../core/base.service';
import { User } from './user.entity';
import { IUser } from '../../../../../libs/models';

@Injectable()
export class UserService extends CrudService<User> {
    constructor(
        @InjectRepository(User)
        repo: Repository<User>
    ) {
        super(repo);
    }

    async findByUsername(username: string): Promise<User> {
        return await this.repository.findOne({ username });
    }
}