
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
    }
});

export const Enrollment = model<EnrollmentEntity>("enrollments", enrollmentSchema);