import { Date, Types } from "mongoose";
import { CourseEntity } from "./CourseEntity";
import { UserEntity } from "./UserEntity";
export enum paymentType{
    credit="credit",
    debit="debit"
}
export interface PaymentEntity {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    courseId: Types.ObjectId;
    method?: string;
    status: string;
    amount: number;
    type?: paymentType;
    createdAt?:string | Date;
    updatedAt?:string | Date;
    course?:CourseEntity;
    user?:UserEntity;
}