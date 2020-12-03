import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { IUser } from '../../../../../libs/models/user';
import { JwtPayload, LoginRequestDto, RegisterRequestDto, IRegistrationStatus } from './interfaces';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { EmailService } from '../email/email.service';
import { TwilioService } from '../twilio/twilio.service';
import { TwilioChannel } from '../twilio/twilio.channel.enum';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private emailService: EmailService,
    private twilioService: TwilioService
  ) { }

  async login(login: LoginRequestDto): Promise<string> {
    const user = await this.userService.findByUsername(login.username);

    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }

    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Email not verified');
    }

    if (!user.isPhoneVerified) {
      throw new UnauthorizedException('Phone not verified');
    }
    
    const isMatch = await bcrypt.compare(login.password, user.password);

    if (isMatch) {
      const signature: JwtPayload = {
        username: user.username
      };
      return this.jwtService.sign(signature);
    }

    throw new UnauthorizedException('Invalid password');
  }

  async register(userDto: RegisterRequestDto): Promise<IRegistrationStatus> {

    try {
      const user = await this.userService.create(userDto);
      await this.emailService.sendVerificationEmail(user)
      return {
        success: true,
        message: `Email verification sent to ${user.email}`
      };
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async verificationCode({ registeredUserPhone }): Promise<IRegistrationStatus> {
    try {
      await this.twilioService.client.verify.services(process.env.TWILIO_SERVICE_SID)
        .verifications
        .create({ to: registeredUserPhone, channel: TwilioChannel.SMS })
      return {
        success: true,
        message: `Verification code sent to ${registeredUserPhone}`
      }
    } catch (error) {
      throw new BadRequestException('Invalid phone number');
    }
  }

  async verificationPhone({ registeredUserPhone, code, userId }): Promise<IRegistrationStatus> {
    try {
      const verification_check = await this.twilioService.client.verify.services(process.env.TWILIO_SERVICE_SID)
        .verificationChecks
        .create({ to: registeredUserPhone, code });

      if (verification_check.valid) {
        const user = await this.userService.findOne(userId);
        await this.userService.update(userId, {
          ...user,
          isPhoneVerified: true
        });

        return {
          success: true,
          message: 'Phone verified'
        }
      }
      throw new BadRequestException('Invalid code.');
    } catch (error) {
      throw new BadRequestException('Cannot verify phone.');
    }
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findByUsername(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}