import { UserEntity } from "../../../domain/entities/UserEntity";
import { User } from "../models";


export const getUserById = async ( userId:string ) : Promise < UserEntity | null > => {
    try {

        if (!userId) {
            return null
        }

        const UserData  = await User.findById(userId)
        if (!UserData) {
            throw new Error("User creation failed!");
        }
        return UserData;
    } catch (error: any) {
        throw new Error(error?.message);
    }
}