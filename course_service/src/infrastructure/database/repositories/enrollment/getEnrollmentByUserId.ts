import mongoose, { Types } from "mongoose";
import { EnrollmentEntity } from "../../../../domain/entities";
import { Enrollment } from "../../models/enrollmentModel";


export const getEnrollmentByUserId = async (
  userId: string
): Promise<EnrollmentEntity[] | null> => {

	
  try {
	const objectId =new Types.ObjectId(userId);
	console.log(objectId,"this is user Id in repo")
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
      {
        $unwind: "$course", 
      },
      {
        $lookup: {
          from: "users", 
          localField: "course.instructorRef",
          foreignField: "_id",
          as: "instructor",
        },
      },
      {
        $unwind: "$instructor", 
      },
      {
        $project: {
          _id: 1,
          userId: 1,
          courseId: 1,
		  progress:1,
		  completionStatus:1,
          course: {
			_id:1,
			title: 1,
            description: 1,
			thumbnail:1,
          },
          instructor: {
            userName: 1,
            email: 1,
          },
        },
      },
    ]);

    if (!enrollment || enrollment.length === 0) {
      throw new Error("No enrollments found!");
    }

    return enrollment as EnrollmentEntity[];
  } catch (error: any) {
    throw new Error(error?.message || "An error occurred while fetching enrollments.");
  }
};
