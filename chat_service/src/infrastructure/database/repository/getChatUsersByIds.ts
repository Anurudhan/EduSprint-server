import { ObjectId } from "mongoose";
import { User } from "../model";

export const getChatUsersByIds = async(Ids:ObjectId[]) => {
    try {
        const users = await User.find({ _id: { $in: Ids } });
        return users && users.length > 0 ? users : null;
    } catch (error:any) {
        console.log(error?.message);
        return null;
    }
}