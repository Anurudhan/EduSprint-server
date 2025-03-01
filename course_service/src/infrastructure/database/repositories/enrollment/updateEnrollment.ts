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
            return null
        }

        return updatedEnrollment;
    } catch (error: any) {
        throw new Error(error?.message);
    }
};
