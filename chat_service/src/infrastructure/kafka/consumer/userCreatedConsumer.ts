import { UserEntity } from "../../../domain/entities";
import { createUser } from "../../database/repository/createUser";


export const userCreatedConsumer = async (
    data: UserEntity
) => {

    try {

        await createUser(data);

        console.log("==========");
        console.log("user-created-consumed");
        console.log("==========");

    } catch (error: any) {
        console.log("user-created-consumed error: ", error?.message);
    }

}