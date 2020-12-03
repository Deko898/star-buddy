import {
    Controller,
    Get,
    HttpStatus,
    Query,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { StarsGetCommand } from './commands';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { IPagination } from '../core/interfaces';
import { StartList, GetAllStarsDto } from './dtos';

@ApiBearerAuth()
@ApiTags('star')
@UseGuards(AuthGuard('jwt'))
@Controller('stars')
export class StarsController {
    constructor(
        private readonly commandBus: CommandBus
    ) {
    }

    @ApiOperation({ summary: 'Get all stars' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Return all stars'
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'Record not found'
    })
    @Get()
    @UseInterceptors(ClassSerializerInterceptor) // needs to check why isnt working
    async findAll(
        @Query() getAllStarsDto: GetAllStarsDto
    ): Promise<IPagination<StartList>> {
        // new GetAllStarsDto(getAllStarsDto)
        return this.commandBus.execute(
            new StarsGetCommand(getAllStarsDto)
        )
    }

    // @ApiOperation({ summary: 'Create new star user' })
    // @ApiResponse({
    //     status: HttpStatus.CREATED,
    //     description: 'The star has been successfully created.' /*, type: T*/
    // })
    // @ApiResponse({
    //     status: HttpStatus.BAD_REQUEST,
    //     description:
    //         'Invalid input, The response body may contain clues as to what went wrong'
    // })
    // @Post('/create')
    // async create(
    //     @Body() createStarUserDto: ICreateStarUserDto,
    //     ...options: any[]
    // ): Promise<Star> {
    //     return this.commandBus.execute(
    //         new StarCreateCommand(entity)
    //     );
    // }
}
