import { Types } from "mongoose";
import { AssessmentEntity } from "../../../../domain/entities";
import AssessmentModel from "../../models/assessmentModel";

export const getAssessmentByCourseId = async ({courseId}:{courseId:string}): Promise<AssessmentEntity[] | null> => {
  try {
    const objectIdCourseId = new Types.ObjectId(courseId);
    const result = await AssessmentModel.find({
        courseId: objectIdCourseId
      });
    return result?result:null;
  } catch (error: unknown) {
    console.log(error);
    return null; 
  }
};
