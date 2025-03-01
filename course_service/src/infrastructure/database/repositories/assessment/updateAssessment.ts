import { Types } from "mongoose";
import { AssessmentEntity } from "../../../../domain/entities";
import AssessmentModel from "../../models/assessmentModel";

export const updateAssessment = async (data: AssessmentEntity): Promise<AssessmentEntity | null> => {
  try {
    console.log("Assessment updating enter to the repo");
    const result = await AssessmentModel.findOneAndUpdate(
      { courseId: new Types.ObjectId(data.courseId),lessonId:data.lessonId},
      { $set: { ...data, updatedAt: new Date() } },
      { new: true, returnDocument: "after" } // Ensure the updated document is returned
    );

    console.log("Assessment updated successfully.");
    return result ? (result as AssessmentEntity) : null;
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
};
