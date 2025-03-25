import { EnrollmentEntity } from "../../../../domain/entities";
import { Enrollment } from "../../models/enrollmentModel";

export const updateEnrollment = async (data: EnrollmentEntity): Promise<EnrollmentEntity | null> => {
    try {
        if (!data._id) {
            return null
        }

        const updatedEnrollment = await Enrollment.findByIdAndUpdate(
            data._id,  // Filter by ID
            data,      // Updated data
            { new: true }  // Return the updated document
        );

        if (!updatedEnrollment) {
            return null;
        }

        // Step 2: Perform aggregation to lookup course and instructor
        const populatedEnrollment = await Enrollment.aggregate([
            // Match the updated document
            { $match: { _id: updatedEnrollment._id } },

            // Lookup the course details
            {
                $lookup: {
                    from: "courses", // Collection name for courses
                    localField: "courseId",
                    foreignField: "_id",
                    as: "course",
                },
            },
            // Unwind the course array (since $lookup returns an array)
            { $unwind: "$course" },

            // Lookup the instructor details (assuming instructorRef is in the course)
            {
                $lookup: {
                    from: "users", // Collection name for users
                    localField: "course.instructorRef",
                    foreignField: "_id",
                    as: "instructor",
                },
            },
            // Unwind the instructor array
            { $unwind: "$instructor" },

            // Project the desired fields
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    courseId: 1,
                    enrolledAt: 1,
                    completionStatus: 1,
                    progress: 1,
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
                        profile: 1,
                    },
                },
            },
        ]);

        // Return the first (and only) result from the aggregation
        if (populatedEnrollment.length === 0) {
            return null;
        }

        return populatedEnrollment[0] as EnrollmentEntity;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};
