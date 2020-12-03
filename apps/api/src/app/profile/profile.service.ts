import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as sharp from 'sharp';
import { Repository, UpdateResult } from 'typeorm';
import { Profile } from './profile.entity';
import { CrudService } from '../core/base.service';
import { User } from '../user/user.entity';
import { ImageType } from '../../../../../libs/models';
import { CreateProfileDto } from './dto';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateUserCommand } from '../user/commands';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { ContextService } from '../context/context.service';
import { Image } from '../image/image.entity';
import { HttpExceptionFilter } from '../core/http-exception.filter';
const path = require('path')

@Injectable()
export class ProfileService extends CrudService<Profile> {
    constructor(
        @InjectRepository(Profile) public repo: Repository<Profile>,
        private commandBus: CommandBus,
        private cloudinaryService: CloudinaryService,
        private contextService: ContextService
    ) {
        super(repo);
    }

    async create(entity: CreateProfileDto, file): Promise<Profile> {
        const user: User = this.contextService.getUserInfoFromJwtToken();
        console.log(user, 'user')
        if (user.profileId) {
            throw new BadRequestException('user already has profile. if you want to change, use UPDATE');
        }
        try {
            let profile: Profile;
            if (file) {
                const cloudinaryResponse = await this.cloudinaryService.upload_stream(file, {
                    resource_type: "image",
                    crop: "scale",
                    quality: "auto",
                    public_id: user.username
                });

                const avatar = {
                    cloud_id: cloudinaryResponse.asset_id,
                    width: cloudinaryResponse.width,
                    height: cloudinaryResponse.height,
                    signature: cloudinaryResponse.signature,
                    original_filename: cloudinaryResponse.original_filename,
                    url: cloudinaryResponse.secure_url,
                    title: user.username
                }
                profile = await super.create({ ...entity, avatar });
            } else {
                profile = await super.create(entity);
            }
            await this.commandBus.execute(new UpdateUserCommand(user.id, { profile }))
            return profile;
        } catch (error) {
            throw new HttpExceptionFilter();
        }
    }

    async update(id: string, entity: CreateProfileDto, user: User, file): Promise<UpdateResult | Profile> {
        if (!file) {
            return super.update(id, entity);
        }
        const profile = await super.findOne(id);
        if (!profile) {
            throw new BadRequestException('profile not found. something wrong');
        }

        const cloudinaryResponse = await this.cloudinaryService.upload_stream(file, {
            resource_type: "image",
            crop: "scale",
            quality: "auto",
            public_id: user.username
        });

        const avatar = {
            cloud_id: cloudinaryResponse.asset_id,
            width: cloudinaryResponse.width,
            height: cloudinaryResponse.height,
            signature: cloudinaryResponse.signature,
            original_filename: cloudinaryResponse.original_filename,
            url: cloudinaryResponse.secure_url,
            title: user.username
        }

        return await this.repo.save({ id, ...entity, avatar });
    }

    async delete(id: string, user: User): Promise<any> {
        // TODO: no cascade OneToOne delete yet. so manually delete image first.
        // https://github.com/typeorm/typeorm/issues/3218
        // await this.imageRepository.delete({ user: { id: user.id }, type: ImageType.Profile });
        // await this.commandBus.execute(new DeleteImageCommand()
        const profile = await super.findOne(id);
        if (!profile) {
            throw new BadRequestException('profile not found. something wrong');
        }

        if (profile.avatar) {
            // its not deleting the asset, should be debbuged
            await this.cloudinaryService.destroy(profile.avatar.cloud_id)
        }
        return super.delete(id);
    }
}
