
import { Schema, model } from "mongoose";
import { EnrollmentEntity } from "../../../domain/entities";



const enrollmentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "courses",
        required: true
    },
    enrolledAt: {
        type: Schema.Types.Date,
        default: function () {
            return Date.now();
        }
    },
    completionStatus: {
        type: String,
        enum: ['enrolled', 'in-progress', 'completed'],
        default: 'enrolled'
    },
    lessonProgresses: [{
        lessonId: {
            type: String,
            required: true
        },
        videoProgress: {
            watchedDuration: {
                type: Number,
                default: 0
            },
            totalDuration: {
                type: Number,
                default: 0
            },
            lastWatchedTimestamp: {
                type: Date
            },
            watchedPercentage: {
                type: Number,
                default: 0
            }
        },
        status: {
            type: String,
            enum: ['not-started', 'in-progress', 'completed'],
            default: 'not-started'
        }
    }],
    progress: {
        completedLessons: {
            type: [String],
            default: [],
        },
        completedAssessments: {
            type: [String],
            default: [],
        },
        overallCompletionPercentage: {
            type: Number,
            default: 0,
        },
    },
    certificate: {
        _id: {
            type: String,
            required: true
        },
        enrollmentId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        courseId: {
            type: String,
            required: true
        },
        issuedAt: {
            type: Date,
            required: true
        },
        certificateNumber: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        downloadUrl: {
            type: String
        }
    }
});

export const Enrollment = model<EnrollmentEntity>("enrollments", enrollmentSchema);