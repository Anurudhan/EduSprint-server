import mongoose, { Schema } from 'mongoose';
import { AssessmentResult } from '../../../domain/entities';

const assessmentResultSchema = new Schema({
  enrollmentId: { type: String, required: true },
  courseId: { type: String, required: true },
  lessonId: { type: String, required: true },
  userId:{ type: String, required: true },
  assessmentId: { type: String, required: true },
  attempts: [{
    score: { type: Number, required: true },
    passed: { type: Boolean, required: true },
    completedAt: { type: Date, default: Date.now },
    answers: [{
      questionId: { type: String, required: true },
      selectedAnswer: { type: String, required: true },
      isCorrect: { type: Boolean, required: true }
    }]
  }],
  bestScore: { type: Number, default: 0 },
  totalPoints: { type: Number, required: true },
  earnedPoints: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['inProgress', 'failed', 'passed'], 
    default: 'inProgress' 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const AssessmentResultModel = mongoose.model<AssessmentResult>('AssessmentResult', assessmentResultSchema);