import { PaymentEntity, paymentType } from "../../../domain/entities";
import { Payment } from "../models";
import { Types } from "mongoose";

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
      user: payment.user,
      type:paymentType.debit
    };
};

export const createPayment = async (
    data: PaymentEntity
): Promise<PaymentEntity | null> => {
    try {
        // Convert string IDs to ObjectIds if needed
        const userId = typeof data.userId === 'string' ? new Types.ObjectId(data.userId) : data.userId;
        const courseId = typeof data.courseId === 'string' ? new Types.ObjectId(data.courseId) : data.courseId;

        const existing = await Payment.findOne({ 
            userId: userId, 
            courseId: courseId,
            status: data.status,
            type:paymentType.debit  
        });

        if (existing) {
            return mapPaymentToEntity(existing);
        }

        const newPayment = await Payment.create({
            ...data,
            userId,
            courseId,
            type:paymentType.debit
        });

        if (!newPayment) {
            throw new Error("Payment creation failed!");
        }

        return mapPaymentToEntity(newPayment);

    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message || "An unexpected error occurred");
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
};