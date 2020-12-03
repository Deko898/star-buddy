import { Controller, Body, Post, Get, UseGuards, HttpStatus, Req, Param } from '@nestjs/common';
import { ApiResponse, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto, JwtTokenDto, IRegistrationStatus, RegisterRequestDto, VerificationCodeDto, VerificationPhoneDto } from './interfaces';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from './guards/jwt.guard';
import { EmailService } from '../email/email.service';
import { ContextService } from '../context/context.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private contextSvc: ContextService,
        private emailService: EmailService
    ) { }

    @ApiResponse({ status: 200, type: User })
    @Get('me')
    @UseGuards(JwtAuthGuard)
    getLoginUser() {
        return this.contextSvc.getUserInfoFromJwtToken();
    }

    @ApiOperation({ summary: 'Is authenticated' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST })
    @UseGuards(JwtAuthGuard)
    @Get('/authenticated')
    async authenticated(): Promise<string> {
        const token = this.contextSvc.getCurrentToken();
        // needs more checks, let it is like this for now
        return token;
    }

    @ApiOperation({ summary: 'User registered' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST })
    @Post('register')
    public async register(
        @Body() createUserDto: RegisterRequestDto,
    ): Promise<IRegistrationStatus> {
        return await this.authService.register(createUserDto);
    }

    @ApiOperation({ summary: 'Email verified' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST })
    @Get('/confirmation/:token')
    public async emailVerificanion(@Param('token') token: string): Promise<IRegistrationStatus> {
        return await this.emailService.verifyEmail(token);
    }

    @ApiOperation({ summary: 'Phone code sent' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST })
    @Post('/phone-verification-code')
    public async phoneveVificationCode(@Body() phoneRegistrationDto: VerificationCodeDto): Promise<IRegistrationStatus> {
        return await this.authService.verificationCode(phoneRegistrationDto);
    }

    @ApiOperation({ summary: 'Phone verified' })
    @ApiResponse({ status: HttpStatus.OK })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST })
    @Post('/phone-verification')
    public async phoneveVification(@Body() phoneRegistrationDto: VerificationPhoneDto): Promise<IRegistrationStatus> {
        return await this.authService.verificationPhone(phoneRegistrationDto);
    }

    @ApiResponse({ status: 200, type: JwtTokenDto })
    @Post('login')
    async login(@Body() login: LoginRequestDto) {
        return this.authService.login(login);
    }
}