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
        
        const result = await Payment.aggregate([
            {
              $lookup: {
                from: "users", 
                localField: "userId", 
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $unwind: "$user",
            },
            {
              $lookup: {
                from: "courses",
                localField: "courseId",
                foreignField: "_id", 
                as: "course", 
              },
            },
            {
              $unwind: "$course",
            },
            {
              $lookup: {
                from: "users",
                localField: "course.instructorRef", 
                foreignField: "_id", 
                as: "course.instructor", 
              },
            },
            {
              $unwind: "$course.instructor", 
            },
            {
              $sort: { createdAt: -1 }, 
            },
          ]);
          console.log(result)
          

        const paymentEntities = result.map(mapPaymentToEntity);

        if (!result) {
            throw new Error("Now payment found");
            
        }

        return paymentEntities

    } catch (error: any) {
        throw new Error(error?.message);
        
    }
}