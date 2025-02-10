import mongoose, { Schema} from 'mongoose';
import { AssessmentEntity, Choice, Question, QuestionType } from '../../../domain/entities/assessmentEntity';

const ChoiceSchema = new Schema<Choice>({
    id: { type: String, required: true },
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true },
  });
  
  const QuestionSchema = new Schema<Question>({
    id: { type: String, required: true },
    type: {
      type: String,
      enum: Object.values(QuestionType),
      required: true,
    },
    text: { type: String, required: true },
    choices: { type: [ChoiceSchema], required: false },
    correctAnswer: { type: String, required: false },
    points: { type: Number, required: true },
  });
  
  const AssessmentEntitySchema = new Schema<AssessmentEntity>(
    {
      courseId: { type: String, required: true },
      lessonId: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
      timeLimit: { type: Number, required: false },
      passingScore: { type: Number, required: true },
      questions: { type: [QuestionSchema], required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      isPublished: { type: Boolean, required: true },
    },
    { timestamps: true } 
  );
  
  const AssessmentModel = mongoose.model<AssessmentEntity>(
    'assessment',
    AssessmentEntitySchema
  );
  
  export default AssessmentModel;