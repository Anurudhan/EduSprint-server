import { UserEntity } from "../../../domain/entities/UserEntity";
import { User } from "../models";


export const createUser = async ( data: UserEntity ) : Promise < UserEntity | null > => {
    try {

        if (data.role == 'student') {
            data = {...data, isVerified: true}
        }

        console.log(data,"create suse ");
        

        const newUser  = await User.create(data)
        if (!newUser) {
            throw new Error("User creation failed!");
        }
        return newUser
    } catch (error: any) {
        throw new Error(error?.message);
    }
}