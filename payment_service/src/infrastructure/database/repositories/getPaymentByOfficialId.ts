import { Types } from "mongoose";
import { Payment } from "../models";
import { PaymentEntity } from "../../../domain/entities";

export const getPaymentsByOfficialId = async (userId: string): Promise<PaymentEntity[] | null> => {
    try {
      const userObjectId = new Types.ObjectId(userId);
      
      console.log("User ObjectId:", userObjectId);
 
      const payments = await Payment.aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        {
          $unwind: {
            path: "$course",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: {
            $or: [
              { userId: userObjectId },
              { "course.instructorRef": userObjectId },
            ],
          },
        },
        {
            $sort: { createdAt: -1 } 
          },
        {
          $project: {
            _id: 1,
            userId: 1,
            courseId: 1,
            method: 1,
            status: 1,
            amount: 1,
            type: 1,
            createdAt: 1,
            updatedAt: 1,
            course: 1,
          },
        }
      ]);
 
      console.log("Matched Payments:", payments);
      console.log("Payments Count:", payments.length);
 
      return payments.length > 0 ? payments : null;
    } catch (error: any) {
      console.error("Detailed Aggregation Error:", error);
      throw new Error(error?.message || "Error fetching payments");
    }
 };