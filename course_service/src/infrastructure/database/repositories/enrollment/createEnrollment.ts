import { EnrollmentEntity } from "../../../../domain/entities";
import { Enrollment } from "../../models/enrollmentModel";


export const createEnrollment = async (data: EnrollmentEntity): Promise <EnrollmentEntity | null> => {
    try {
        const enrolled = await Enrollment.create(data)

        if (!enrolled) {
            throw new Error("Course enrollment failed!");
        }
        console.log("I am enrolled =========================> " ,enrolled.userId)
        return enrolled;

    } catch (error: any) {
        throw new Error(error?.message);
    }
}