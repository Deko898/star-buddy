import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentAccount } from './payment-account.entity';
import { PaymentIntent } from './payment-intent.entity';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(PaymentAccount) public paymentAccRepo: Repository<PaymentAccount>,
        @InjectRepository(PaymentIntent) public paymentIntentRepo: Repository<PaymentIntent>,
        private _stripeService: StripeService
    ) {
    }

    async createAccount(createPaymentAccoutDto) {
        const account = await this._stripeService.createAccount();
        const paymentAcc = new PaymentAccount();
        paymentAcc.payment_provider_account_id = account.id;
        return await this.paymentAccRepo.save(paymentAcc)
    }

    updateAccount() {

    }

    createPaymentIntent(createPaymentIntentDto) {

    }

    acceptPaymentIntent() {

    }
}
