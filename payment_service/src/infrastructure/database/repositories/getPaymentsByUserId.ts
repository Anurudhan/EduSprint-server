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

export const getPaymentsByUserId = async (userId: string):Promise<{
        payments: PaymentEntity[]|null;
        lastPayment: string;
        totalAmount: string;
        totalPayments: string;
        pendingPaymentCount: string;
      }> => {
  try {
      const payments = await Payment.find({ userId: userId }).sort({ createdAt: -1 });
      
      const paymentEntities = payments.map(mapPaymentToEntity);
    

    if (!payments || payments.length === 0) {
      throw new Error("No payments found");
    }

    const pendingPayments = payments.filter(payment => payment.status === "pending");
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0).toString(); 
    const totalPayments = payments.length.toString();
    const pendingPaymentCount = pendingPayments.length.toString();
    const lastPayment = payments[0].amount?payments[0].amount.toString():"0"; 
    return {
      payments:paymentEntities,
      lastPayment,
      totalAmount,
      totalPayments,
      pendingPaymentCount,
    };
  } catch (error: any) {
    throw new Error(error?.message || "Error fetching payments");
  }
};
