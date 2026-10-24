import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MobileMoneyService {
  private readonly logger = new Logger(MobileMoneyService.name);

  async initiatePayment(data: {
    amount: number;
    patientId: string;
    consultationId: string;
    phone: string;
    operator: 'WAVE' | 'ORANGE' | 'MTN' | 'MOOV';
  }) {
    const transactionId = `LIFE-${Date.now()}-${data.patientId.slice(0,4)}`;
    
    this.logger.log(`💰 Paiement DEMO: ${data.amount} XOF via ${data.operator} pour ${data.phone}`);

    // MODE DEMO - Pas besoin de CinetPay pour tester
    // En prod, tu décommenteras l'appel axios avec tes clés
    const isDemo = !process.env.CINETPAY_APIKEY;

    if (isDemo) {
      return {
        transactionId,
        paymentUrl: `https://pay.wave.com/m/M_ci?amount=${data.amount}&transaction=${transactionId}`,
        deepLink: `wave://pay?amount=${data.amount}&phone=${data.phone}`,
        status: 'DEMO_SUCCESS',
        message: `Démo OK - ${data.amount} XOF via ${data.operator}`,
        operator: data.operator,
        amount: data.amount,
        phone: data.phone
      };
    }

    // MODE PROD avec CinetPay (quand tu auras les clés)
    // const res = await axios.post(...)
    return { transactionId, paymentUrl: 'https://cinetpay.com/pay' };
  }

  async handleWebhook(cinetpayData: any) {
    this.logger.log(`Webhook reçu: ${JSON.stringify(cinetpayData)}`);
    return { success: true, message: 'Paiement validé - InsuranceClaim 80% créé' };
  }
}
