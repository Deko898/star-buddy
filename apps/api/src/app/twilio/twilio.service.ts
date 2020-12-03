import { Injectable, Inject } from '@nestjs/common';
import { Twilio } from 'twilio';
import { TWILIO_CONFIG_TOKEN, TwilioConfig } from './twilio.config';

@Injectable()
export class TwilioService {
    constructor(@Inject(TWILIO_CONFIG_TOKEN) private options: TwilioConfig) {
        this.implementTwilioSdk = new Twilio(
            this.options.accountSid,
            this.options.authToken,
        );
    }

    private readonly implementTwilioSdk: Twilio;

    public get client(): Twilio {
        return this.implementTwilioSdk;
    }
}