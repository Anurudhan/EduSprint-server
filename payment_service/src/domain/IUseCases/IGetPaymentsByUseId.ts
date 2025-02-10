import { PaymentEntity } from "../entities";

export interface IGetPaymentsByUserId {
    execute: (userId:string) =>Promise<{
        payments: PaymentEntity[]|null;
        lastPayment?: string;
        totalAmount?: string;
        totalPayments?: string;
        pendingPaymentCount?: string;
      }> 
}