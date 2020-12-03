import {
    Controller,
    HttpStatus,
    UseGuards,
    Post,
    Body
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';

@ApiBearerAuth()
@ApiTags('payments')
@UseGuards(AuthGuard('jwt'))
@Controller('payments')
export class PaymentsController {
    constructor(
        private readonly paymentService: PaymentsService
    ) {
    }

    @ApiOperation({ summary: 'Create new Stripe account' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The account has been successfully created.' /*, type: T*/
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description:
            'Invalid input, The response body may contain clues as to what went wrong'
    })
    @Post('/create-account')
    async create(
        @Body() createPaymentAccoutDto,
        ...options: any[]
    ): Promise<any> {
        return this.paymentService.createAccount(createPaymentAccoutDto);
    }
}
