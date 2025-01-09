import { constant } from "../../_lib/common/constant";
import { IDependencies } from "../interfaces/IDependencies";

export const createOtpUseCase = (dependencies:IDependencies) => {
    const { repositories : {createOtp}} = dependencies

    return{
        execute : async (email:string,otp:number|string) => {
            try{

                console.log("data use Case", email,otp);
                
                return await createOtp(email,otp);
            }
            catch(error:constant){
                throw new Error(error?.message||"User otp Creation failed");
                
            }
        }
    }


}