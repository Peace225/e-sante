import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { PaymentsModule } from './payments/payments.module';
@Module({
  imports: [PaymentsModule],
  controllers: [BillingController],
})
export class BillingModule {}
