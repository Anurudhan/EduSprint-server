import { IDependencies } from "../interface/IDependencie";

export const getPaymentsUserIdUseCase = (dependencies: IDependencies) => {
    const { repositories: {getPaymentsByUserId,getUserById,getPaymentsByOfficialId} } = dependencies
    return {
        execute: async (userId:string) => {
            const user= await getUserById(userId)
            if(user?.role =="student"){
                return await getPaymentsByUserId(userId)
            }
            else{
                let result  = await getPaymentsByOfficialId(userId)
                return {payments:result}
            }
        }
    }
}