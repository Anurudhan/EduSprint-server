import { Types } from "mongoose";
import { AssessmentEntity, AssessmentResult } from "../../../../domain/entities";
import AssessmentModel from "../../models/assessmentModel";
import { AssessmentResultModel } from "../../models/assessmentResult";

export const getAssessmentResultByEnrollmentId = async ({enrollmentId}:{enrollmentId:string}): Promise<AssessmentResult[]| []> => {
  try {
    const objectIdEnrollmentId = new Types.ObjectId(enrollmentId);
    const result = await AssessmentResultModel.find({
        enrollmentId: objectIdEnrollmentId
      });
    return result?result:[];
  } catch (error: unknown) {
    console.log(error);
    return []; 
  }
};
