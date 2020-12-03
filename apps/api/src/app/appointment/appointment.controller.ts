import {
    Controller,
    Get,
    HttpStatus,
    Query,
    UseGuards,
    UseInterceptors,
    ClassSerializerInterceptor,
    Post,
    Body,
    Put,
    Param
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Appointment } from './appointment.entity';
import { SchedueleAppointmentDto, UpdateAppointmentDto } from './dtos';
import { SchedueleAppointmentCommand, UpdateAppointmentCommand } from './commands';


@ApiBearerAuth()
@ApiTags('appointment')
@UseGuards(AuthGuard('jwt'))
@Controller('appointment')
export class AppointmentController {
    constructor(
        private readonly commandBus: CommandBus
    ) {
    }

    @ApiOperation({ summary: 'Scheduele appointment' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Scheduele appointment with status PENDING.' /*, type: T*/
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description:
            'Invalid input, The response body may contain clues as to what went wrong'
    })
    @Post('scheduele')
    async scheduele(
        @Body() schedueleAppointmentBody,
        ...options: any[]
    ): Promise<Appointment> {
        const schedueleAppointmentDto = new SchedueleAppointmentDto(schedueleAppointmentBody);
        return this.commandBus.execute(
            new SchedueleAppointmentCommand(schedueleAppointmentDto)
        );
    }

    @ApiOperation({ summary: 'Create new star user' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Update appointment with status APPROVED or REJECTED.' /*, type: T*/
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description:
            'Invalid input, The response body may contain clues as to what went wrong'
    })
    @Put(':id')
    async update(
        @Param('id') appointmentId: string,
        @Body() updateAppointmentBody,
        ...options: any[]
    ): Promise<Appointment> {
        const updateAppointmentDto = new UpdateAppointmentDto({ ...updateAppointmentBody, appointmentId });
        return this.commandBus.execute(
            new UpdateAppointmentCommand(updateAppointmentDto)
        );
    }
}
