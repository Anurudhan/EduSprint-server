import mongoose from "mongoose";

export enum SubscriptionType {
    none = "none",
    basic = "basic",
    standard = "standard",
    premium = "premium"
}

export enum ChatStatus {
    requested = "requested",
    active = "active",
    block = "block"
}

export enum ChatType {
    individual = "individual",
    group = "group"
}

export interface IChat {
    _id?: string | mongoose.Types.ObjectId;
    chatType: ChatType;
    status?: ChatStatus;
    subscriptionType?: SubscriptionType;
    participants: string[] | mongoose.Types.ObjectId[];
    admins?: string[] | mongoose.Types.ObjectId[];
    name?: string | null; 
    avatar?: string | null;
    lastMessage?: {
        messageId?: string | null;
        content?: string | null;
        sender?: string | null;
        timestamp?: Date | null;
    } | null;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    unreadCount: Array<{
        userId: string | mongoose.Types.ObjectId | null;
        count: number;
    }>;
}