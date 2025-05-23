import mongoose, { Schema, model } from "mongoose";
import { UserEntity } from "../../../domain/entities";


export const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		userName: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["student", "instructor", "admin"],
			default: "pending",
		},
		profile: {
			avatar: {
				type: String,
				default: "https://www.pngkey.com/png/detail/72-729716_user-avatar-png-graphic-free-download-icon.png"
			},
			dateOfBirth: {
				type: String,
			},
			gender: {
				type: String,
				enum: ["male", "female", "other"],
			},
		},
		contact: {
			address: {
				type: String,
			},
			phone: {
				type: String,
			},
			social: {
				type: String
			},
		},
		profession: {
            enum: ["student", "working"],
            type: String,
		},
		cv: {
            type: String,
		},
		profit: {
            type: Number,
			default: 0,
		},
        isBlocked: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        isRequested: {
            type: Boolean,
            default: true,
        },
		isGAuth: {
			type: Boolean,
			default: false
		},
		isRejected: {
			type: Boolean,
			default: false
		},
	},
	{
		timestamps: true,
	}
);


export const User = model<UserEntity>("users",userSchema)