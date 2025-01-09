import { Date, Types } from "mongoose";

interface Lesson {
    lessonNumber: string,
    title: string;
    description: string;
    video: string;
    duration: string;
    objectives: string[];
}

interface Trial {
    video: string;
}

interface Attachments {
    title: string;
    url: string;
}

export enum PricingType {
    free = 'free',
    paid = 'paid'
}

interface Pricing {
    amount: number;
    type: PricingType;
}

export enum Level {
    beginner = 'beginner',
    intermediate = 'intermediate',
    advanced = 'advanced'
}

export interface CourseEntity {
    _id?: Types.ObjectId;
    title: string;
    description: string;
    thumbnail: string;
    instructorRef: string;
    categoryRef: Types.ObjectId;
    language?: string;
    lessons: [Lesson]
    trial?: Trial;
    attachments?: Attachments;
    createdAt?: Date;
    updatedAt?: Date;
    pricing: Pricing;
    rating?: number;
    level: Level;
    isRequested: boolean | string;
    isBlocked?: boolean | string;
    isPublished?: boolean | string;
    isRejected?: boolean | string;
    studentsEnrolled?: number;
    students?:string[];
}