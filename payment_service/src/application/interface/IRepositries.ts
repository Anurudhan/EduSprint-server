import { PaymentEntity, SessionEntity } from "../../domain/entities";


export interface IRepositories{
    createSession: (data: SessionEntity) => Promise<SessionEntity | null>;
    createPayment: (data: PaymentEntity) => Promise<PaymentEntity | null>;
    getAllPayments: () => Promise<PaymentEntity [] | []>;
    getPaymentsByUserId: (userId: string) => Promise<{
        payments: PaymentEntity[]|null;
        lastPayment:string;
        totalAmount: string;
        totalPayments: string;
        pendingPaymentCount: string;
      }>;
} 