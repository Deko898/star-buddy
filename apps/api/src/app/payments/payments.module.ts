import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentAccount } from "./payment-account.entity";
import { PaymentIntent } from "./payment-intent.entity";
import { PaymentsService } from "./payments.service";
import { PaymentsController } from "./payments.controller";


@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentAccount, PaymentIntent]),
    ],
    providers: [PaymentsService],
    exports: [],
    controllers: [PaymentsController]
})
export class PaymentsModule { }