import { PaymentEntity } from "../../../domain/entities";
import { Payment } from "../models";

const mapPaymentToEntity = (payment: any): PaymentEntity => {
    return {
      _id: payment._id,
      userId: payment.userId,
      courseId: payment.courseId,
      method: payment.method,
      status: payment.status,
      amount: payment.amount,
      createdAt: payment.createdAt?.toISOString(),
      updatedAt: payment.updatedAt?.toISOString(),
      course: payment.course,
      user: payment.user
    };
  };

export const getAllPayments = async ():Promise<PaymentEntity[]> => {
    try {
        
        const result = await Payment.find({})

        const paymentEntities = result.map(mapPaymentToEntity);

        if (!result) {
            throw new Error("Now payment found");
            
        }

        return paymentEntities

    } catch (error: any) {
        throw new Error(error?.message);
        
    }
}