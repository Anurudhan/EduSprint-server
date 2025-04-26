
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
        },
        enrollmentId: {
            type: String,
        },
        userId: {
            type: String,
        },
        courseId: {
            type: String,
        },
        issuedAt: {
            type: Date,
        },
        certificateNumber: {
            type: String,
        },
        score: {
            type: Number,
        },
        downloadUrl: {
            type: String
        }
    }
});

export const Enrollment = model<EnrollmentEntity>("enrollments", enrollmentSchema);