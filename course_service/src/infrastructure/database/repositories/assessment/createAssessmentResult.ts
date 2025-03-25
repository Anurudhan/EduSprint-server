// backend/services/assessmentService.ts (or similar)
import { AssessmentResult } from "../../../../domain/entities";
import AssessmentModel from "../../models/assessmentModel";
import { AssessmentResultModel } from "../../models/assessmentResult";

export const createAssessmentResult = async (
  data: AssessmentResult
): Promise<AssessmentResult | null> => {
  try {
    // Check for existing assessment result for this enrollment and lesson
    const existingAssessment = await AssessmentResultModel.findOne({
      enrollmentId: data.enrollmentId,
      lessonId: data.lessonId,
    });
    const assessment = await AssessmentModel.findById(data.assessmentId);
    if (!assessment) {
      return null
    }
    const passingScore = assessment.passingScore;
    let result: AssessmentResult | null = null;

    if (existingAssessment) {
      // Add the new attempt to the existing record
      const newAttempt = data.attempts[0]; // Assuming data.attempts contains the new attempt
      existingAssessment.attempts.push(newAttempt);

      // Update bestScore if the new score is higher
      if (newAttempt.score > existingAssessment.bestScore) {
        existingAssessment.bestScore = newAttempt.score;
        existingAssessment.status =
          newAttempt.score >= passingScore ? "passed" : "failed"; // Assuming passingScore is available in the schema
      }

      // Update timestamps
      existingAssessment.updatedAt = new Date();

      // Save the updated document
      result = await existingAssessment.save();
      console.log("Assessment updated successfully with new attempt.");
    } else {
      // Create a new assessment result if none exists
      const newAssessment = new AssessmentResultModel(data);
      result = await newAssessment.save();
      console.log("Assessment created successfully.");
    }

    return result;
  } catch (error: unknown) {
    console.error("Error in createAssessmentResult:", error);
    return null; // Return null on error
  }
};