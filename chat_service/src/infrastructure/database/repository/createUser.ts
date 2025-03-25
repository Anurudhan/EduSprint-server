import { UserEntity } from "../../../domain/entities";
import { User } from "../model";

export const createUser = async ( data: UserEntity ) : Promise < UserEntity | null > => {
    try {

        if (data.role == 'student') {
            data = {...data, isVerified: true}
        }

        console.log(data,"create suse ");
        

        const newUser  = await User.create(data)

        return newUser?newUser:null;
    } catch (error: any) {
        throw new Error(error?.message);
    }
}