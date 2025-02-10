import { AssessmentEntity } from "../../../../domain/entities";
import AssessmentModel from "../../models/assessmentModel";

export const createAssessment = async (data: AssessmentEntity): Promise<AssessmentEntity | null> => {
  try {
    const existingAssessment = await AssessmentModel.findOne({
      courseId: data.courseId,lessonId:data.lessonId
    });
    let result: AssessmentEntity | null = null;

    if (existingAssessment) {
      await AssessmentModel.updateOne(
        { courseId: data.courseId },
        { $set: data, updatedAt: new Date() }
      );
      result = { ...existingAssessment.toObject(), ...data }; // Merge the existing and updated data
      console.log("Assessment updated successfully.");
    } else {
      const newAssessment = new AssessmentModel(data);
      result = await newAssessment.save();
      console.log("Assessment created successfully.");
    }

    return result;
  } catch (error: unknown) {
    console.log(error);
    return null; // Ensure a null value is returned on error
  }
};
