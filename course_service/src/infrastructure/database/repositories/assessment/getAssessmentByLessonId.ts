import { Types } from "mongoose";
import { AssessmentEntity } from "../../../../domain/entities";
import AssessmentModel from "../../models/assessmentModel";

export const getAssessmentByLessonId = async ({courseId,lessonId}:{courseId:string,lessonId:string}): Promise<AssessmentEntity | null> => {
  try {
    const objectIdCourseId = new Types.ObjectId(courseId);
    const result = await AssessmentModel.findOne({
        courseId: objectIdCourseId,lessonId:lessonId
      });
    return result?result:null;
  } catch (error: unknown) {
    console.log(error);
    return null; 
  }
};
