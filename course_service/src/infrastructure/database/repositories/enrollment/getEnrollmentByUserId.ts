import { Types } from "mongoose";
import { EnrollmentEntity } from "../../../../domain/entities";
import { Enrollment } from "../../models/enrollmentModel";
import { profile } from "console";

export const getEnrollmentByUserId = async (
  userId: string
): Promise<EnrollmentEntity[] | null> => {
  try {
    const objectId = new Types.ObjectId(userId);
    console.log(objectId, "this is user Id in repo");

    const enrollment = await Enrollment.aggregate([
      { $match: { userId: objectId } },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "course",
        },
      },
      { $unwind: "$course" },
      {
        $lookup: {
          from: "users",
          localField: "course.instructorRef",
          foreignField: "_id",
          as: "instructor",
        },
      },
      { $unwind: "$instructor" },
      {
        $project: {
          _id: 1,
          userId: 1,
          courseId: 1,
          progress: 1,
          completionStatus: 1,
          course: {
            _id: 1,
            title: 1,
            description: 1,
            thumbnail: 1,
            instructorRef: 1,
            categoryRef: 1,
            language: 1,
            lessons: 1, 
            trial: 1,
            attachments: 1,
            createdAt: 1,
            updatedAt: 1,
            pricing: 1, 
            rating: 1,
            level: 1,
            isRequested: 1,
            isBlocked: 1,
            isPublished: 1,
            isRejected: 1,
            studentsEnrolled: 1,
            students: 1,
          },
          instructor: {
            _id: 1,
            userName: 1,
            email: 1,
            role: 1,
            profile:1
          },
        },
      },
    ]);

    if (!enrollment || enrollment.length === 0) {
      return null;
    }

    return enrollment as EnrollmentEntity[];
  } catch (error: any) {
    throw new Error(
      error?.message || "An error occurred while fetching enrollments."
    );
  }
};
