import { Types } from "mongoose";
import { CourseEntity } from "./courseEntity";
import { UserEntity } from "./userEntity";

export enum CompletionStatus {
    enrolled = 'enrolled',
    inProgress = 'in-progress',
    Completed = 'completed',
}
export interface LessonProgress {
    lessonId: string;
    videoProgress?: {
        watchedDuration: number;  // in seconds
        totalDuration: number;    // in seconds
        lastWatchedTimestamp?: Date;
        watchedPercentage: number;
    };
    status: 'not-started' | 'in-progress' | 'completed';
  }
  export interface Certificate {
    _id: string;
    enrollmentId: string;
    userId: string;
    courseId: string;
    issuedAt: Date;
    certificateNumber: string;
    score: number; // Overall course score
    downloadUrl?: string;
  }
export interface EnrollmentEntity {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    enrolledAt?: Date | string;
    completionStatus?: CompletionStatus;
    lessonProgresses?: LessonProgress[];
    progress?: {
        completedLessons?:  Types.ObjectId[] | [] | null;
        completedAssessments?: Types.ObjectId[] | [] | null;
        overallCompletionPercentage?: number
    };
    course?:CourseEntity;
    instructor?: UserEntity;
    certificate?: Certificate;
};