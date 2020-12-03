import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';
import { Currency } from '../../../../../libs/models';
import { calculatePercentage } from '../../../../../libs/utils/src/lib/math/percentage';

export type LineItem = Stripe.Checkout.SessionCreateParams.LineItem;
const baseUrl = 'http://localhost:4200';
@Injectable()
export class StripeService {
    public constructor(@InjectStripe() private readonly stripe: Stripe) {
    }

    async createAccount() {
        return await this.stripe.accounts.create({
            settings: {
                payouts: {
                    schedule: {
                        interval: 'manual',
                    },
                },
            }
        })
    }

    async updateAccount(stripeAccountId: string) {
        await this.stripe.accounts.update(
            stripeAccountId,
            {
                settings: {
                    payouts: {
                        schedule: {
                            interval: 'manual'
                        },
                    },
                },
            }
        );
    }

    async createCheckoutSession(line_items: LineItem[]): Promise<Stripe.Checkout.Session> {
        return this.stripe.checkout.sessions.create({
            payment_method_types: ['card', 'ideal'],
            line_items,
            success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/cancel`
        })
    };

    async createPaymentIntent(amount: number, stripeAccountId: string, currency: Currency) {
        return await this.stripe.paymentIntents.create({
            currency,
            capture_method: 'manual',
            payment_method: 'payment_method',
            payment_method_types: ['card'],
            amount,
            application_fee_amount: calculatePercentage(amount, 20),
            transfer_data: {
                destination: stripeAccountId
            },
        });
    };

    async acceptPayment(payment_intent: string) {
        'pi_1Hkz9lI6J6TttJpLWZuNi6p7'
        return await this.stripe.paymentIntents.capture(payment_intent)
    }

    async cancelPaymentIntent(payment_intent: string) {
        return await this.stripe.paymentIntents.cancel(payment_intent);
    };

    async refundPayment(payment_intent: string) {
        return await this.stripe.refunds.create({
            payment_intent,
            refund_application_fee: true
        });
    };

    async refundCharge(chargeId: string) {
        return await this.stripe.refunds.create({
            charge: chargeId,
            reverse_transfer: true,
            refund_application_fee: true
        });
    }
}
