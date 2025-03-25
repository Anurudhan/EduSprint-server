    
export enum QuestionType {
    MULTIPLE_CHOICE = 'multiple_choice',
    TRUE_FALSE = 'true_false',
    SHORT_ANSWER = 'short_answer',
    ESSAY = 'essay',
  }
  
  export interface Choice  {
    id: string;
    text: string;
    isCorrect: boolean;
  }
  
  export interface Question  {
    id: string;
    type: QuestionType;
    text: string;
    choices?: Choice[];
    correctAnswer?: string;
    points: number;
  }
  
  export interface AssessmentEntity  {
    courseId: string;
    lessonId: string;
    title: string;
    description: string;
    timeLimit?: number;
    passingScore: number;
    questions: Question[];
    createdAt?: Date;
    updatedAt?: Date;
    isPublished: boolean;
  }

  export interface AssessmentResult {
    _id: string;
    enrollmentId: string;
    courseId: string;
    lessonId: string;
    assessmentId: string;
    attempts: {
      score: number;
      passed: boolean;
      completedAt: Date;
      answers: { questionId: string; selectedAnswer: string; isCorrect: boolean }[];
    }[];
    bestScore: number;
    totalPoints: number;
    earnedPoints: number;
    status: 'inProgress' | 'failed' | 'passed';
    createdAt: Date;
    updatedAt: Date;
  }