import { Controller, Post, Body, Logger } from '@nestjs/common';
import { MobileMoneyService } from './payments/mobile-money.service';
@Controller('billing')
export class BillingController {
  private readonly logger = new Logger(BillingController.name);
  constructor(private readonly mobileMoney: MobileMoneyService) {}
  @Post('pay')
  async pay(@Body() body: any) {
    this.logger.log(`Paiement demandé: ${body.amount} XOF via ${body.operator}`);
    return this.mobileMoney.initiatePayment(body);
  }
  @Post('webhook/cinetpay')
  async webhook(@Body() body: any) {
    this.logger.log(`Webhook CinetPay: ${JSON.stringify(body)}`);
    return this.mobileMoney.handleWebhook(body);
  }
}
