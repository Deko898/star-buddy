import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../../../../../libs/models';
import * as nodemailer from 'nodemailer';
import { UserService } from '../user/user.service';
import { environment } from '../../environments/environment';
import { TRANSPORT_CONFIG } from '../config';
import { HttpExceptionFilter } from '../core/http-exception.filter';
import { User } from '../user/user.entity';


@Injectable()
export class EmailService {
    constructor(
        private readonly jwtService: JwtService,
        private userService: UserService
    ) { }

    async sendVerificationEmail(user: User) {
        try {
            const emailToken = await this.jwtService.signAsync({ id: user.id });
            const url = `http://localhost:4000/api/auth/confirmation/${emailToken}`;

            const transporter = nodemailer.createTransport(TRANSPORT_CONFIG);

            return await transporter.sendMail({
                from: 'Star Buddy',
                to: user.email,
                subject: 'Confirm Email',
                html: `Please click this link to confirm your email: <a href="${url}">${url}</a>`
            })
        } catch (error) {
            throw new HttpExceptionFilter()
        }
    }

    async verifyEmail(token) {
        try {
            const { id } = await this.jwtService.verifyAsync(token, { secret: environment.emailSecret });
            const user = await this.userService.findOne(id);
            await this.userService.update(id, {
                ...user,
                isEmailVerified: true
            });

            return {
                success: true,
                message: 'Email verified'
            }
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async acceptVideoCallRequest(senderId, recepientId, date) {
        const emailToken = await this.jwtService.signAsync({ senderId, recepientId, date });

        const url = `http://localhost:4000/api/room/${emailToken}`;
        const transporter = nodemailer.createTransport(TRANSPORT_CONFIG);

        

    }

}