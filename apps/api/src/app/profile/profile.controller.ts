import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    NotFoundException,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
    UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Profile } from './profile.entity';
import { CurrentUser } from '../auth/decorators';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ContextService } from '../context/context.service';

const ALLOWED_MIME_TYPES = ['image/gif', 'image/png', 'image/jpeg', 'image/jpg', 'image/bmp', 'image/webp'];

@ApiTags('Profile', 'User')
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
    constructor(
        private readonly profileService: ProfileService,
        private contextService: ContextService
    ) {
    }

    @ApiOperation({ summary: 'get CurrentUser Profile' })
    @Get('myprofile')
    async myProfile(): Promise<Profile> {
        const user = this.contextService.getUserInfoFromJwtToken()
        if (user.profileId) {
            // TODO: https://github.com/typeorm/typeorm/issues/1865
            return this.profileService.findOne(user.profileId);
        } else {
            throw new NotFoundException('No Profile Found');
        }
    }

    // @ApiOperation({ summary: 'find all Profiles. Admins only' })
    // @ApiTags('Admin')
    // @Roles(RolesEnum.ADMIN)
    // @Get()
    // async findAll(): Promise<ProfileList> {
    //     return this.profileService.findAll();
    // }

    // @ApiOperation({ summary: 'Find Profile by id. Admins only' })
    // @ApiTags('Admin')
    // @Roles(RolesEnum.ADMIN)
    // @Get(':id')
    // async findById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<Profile> {
    //     console.log('in findById', id);
    //     return this.profileService.findOne(id);
    // }

    @ApiOperation({ summary: 'Create new Profile.' })
    @ApiConsumes('multipart/form-data')
    // TODO @ApiImplicitFile({ name: 'file', required: true, description: 'Profile Picture' })
    @ApiBody({
        description: 'Profile Picture',
        type: CreateProfileDto,
    })
    @UseInterceptors(
        FileInterceptor('file', {
            fileFilter: (req, file, cb) => {
                if (ALLOWED_MIME_TYPES.indexOf(file.mimetype) === -1) {
                    return cb(
                        new BadRequestException(
                            `Error! Incorrect mimetype '${file.mimetype}'. Correct: ${ALLOWED_MIME_TYPES.join(', ')}`,
                        ),
                        false,
                    );
                }
                cb(null, true);
            },
            limits: {
                fileSize: 1024000,
            },
        }),
    )
    @Post()
    async create(@Body() entity: CreateProfileDto, @UploadedFile() file): Promise<Profile> {
        return this.profileService.create(entity, file);
    }

    @ApiOperation({ summary: 'Update an existing record' })
    @ApiConsumes('multipart/form-data')
    // TODO @ApiImplicitFile({ name: 'file', required: false, description: 'Profile Picture' })
    @UseInterceptors(
        FileInterceptor('file', {
            fileFilter: (req, file, cb) => {
                if (ALLOWED_MIME_TYPES.indexOf(file.mimetype) === -1) {
                    return cb(
                        new BadRequestException(
                            `Error! Incorrect mimetype '${file.mimetype}'. Correct: ${ALLOWED_MIME_TYPES.join(', ')}`,
                        ),
                        false,
                    );
                }
                cb(null, true);
            },
            limits: {
                fileSize: 1024000,
            },
        }),
    )
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() entity: CreateProfileDto,
        @UploadedFile() file
    ): Promise<any> {
        const user = this.contextService.getUserInfoFromJwtToken();
        if (!user.profileId) {
            throw new ForbiddenException('Current User dont have profile');
        }
        if (user.profileId !== id) {
            throw new ForbiddenException('only owner can update their profile');
        }
        return this.profileService.update(id, entity, user, file);
    }

    @ApiOperation({ summary: 'Delete Profile' })
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any> {
        const user = this.contextService.getUserInfoFromJwtToken()
        if (!user.profileId) {
            throw new ForbiddenException('Current User dont have profile');
        }
        if (user.profileId !== id) {
            throw new ForbiddenException('only owner can delete their profile');
        }
        return this.profileService.delete(id, user);
    }
}
