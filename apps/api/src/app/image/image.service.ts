import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '../core/base.service';
import { Image } from './image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService extends CrudService<Image> {
    constructor(
        @InjectRepository(Image) public repo: Repository<Image>
    ) {
        super(repo);
    }
}
