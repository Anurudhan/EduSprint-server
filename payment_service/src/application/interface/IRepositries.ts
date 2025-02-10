import { PaymentEntity, SessionEntity } from "../../domain/entities";
import { UserEntity } from "../../domain/entities/UserEntity";


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
    getPaymentsByOfficialId:(userId:string) => Promise<PaymentEntity[] | null>;
    getUserById:(userId:string) => Promise<UserEntity | null>;
} 