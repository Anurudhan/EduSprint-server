import { Types } from "mongoose";
import { AssessmentEntity, AssessmentResult } from "../../../../domain/entities";
import AssessmentModel from "../../models/assessmentModel";
import { AssessmentResultModel } from "../../models/assessmentResult";

export const getAssessmentResultByEnrollmentId = async ({enrollmentId}:{enrollmentId:string}): Promise<AssessmentResult| null> => {
  try {
    const objectIdEnrollmentId = new Types.ObjectId(enrollmentId);
    const result = await AssessmentResultModel.findOne({
        enrollmentId: objectIdEnrollmentId
      });
    return result?result:null;
  } catch (error: unknown) {
    console.log(error);
    return null; 
  }
};
