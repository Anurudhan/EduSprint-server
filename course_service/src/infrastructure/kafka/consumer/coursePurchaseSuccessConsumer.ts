import { EnrollmentEntity } from "../../../domain/entities";
import {
    createEnrollment,
    getEnrollmentByUserId,
    updateUserProfit
} from "../../database/repositories";

export const coursePurchaseSuccessConsumer = async (data: any) => {
    try {
        console.log(data, "Received data for coursePurchaseSuccess");

        const existingEnrollments = await getEnrollmentByUserId(data.studentId);
        console.log(existingEnrollments, "Existing enrollments for user");

        const match = existingEnrollments?.enrollment.find(
            (item) => item.courseId.toString() === data.courseId.toString()
        );

        console.log(match, "Matched enrollment if any");

        if (match) return;

        const enrollmentData = {
            userId: data.studentId,
            courseId: data.courseId,
            enrolledAt: new Date(),
            completionStatus: "enrolled",
            instructorId: data.instructorId,
            lessonProgresses: [],
            progress: {
                completedLessons: [],
                completedAssessments: [],
                overallCompletionPercentage: 0,
            },
        };

        await createEnrollment(enrollmentData as EnrollmentEntity);

        // Updating instructor's profit
        await updateUserProfit(data.instructorId, data.amount);

        console.log("==========");
        console.log("updateUserProfit-consumed--->course-services");
        console.log("==========");
    } catch (error: any) {
        console.error("Error in coursePurchaseSuccessConsumer:", error.message);
    }
};
