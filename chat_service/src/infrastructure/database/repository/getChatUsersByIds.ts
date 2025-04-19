import mongoose from "mongoose";
import { User } from "../model";

export const getChatUsersByIds = async (ids: mongoose.Types.ObjectId[]) => {
    try {
        const users = await User.find({ _id: { $in: ids } });
        return users.length > 0 ? users : null;
    } catch (error: any) {
        console.log(error.message);
        return null;
    }
};
