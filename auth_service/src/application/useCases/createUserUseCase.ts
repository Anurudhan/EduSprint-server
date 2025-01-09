import { constant } from "../../_lib/common/constant";
import { UserEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const createUserUseCase = (dependencies:IDependencies) => {
    const { repositories : {createUser}} = dependencies

    return{
        execute : async (data : UserEntity) => {
            try{

                console.log("data use Case", data.role);
                
                return await createUser(data);
            }
            catch(error:constant){
                throw new Error(error?.message||"User Creation failed");
                
            }
        }
    }
}