import { IDependencies } from "../interface/IDependencie";

export const getPaymentsUserIdUseCase = (dependencies: IDependencies) => {
    const { repositories: {getPaymentsByUserId} } = dependencies
    return {
        execute: async (userId:string) => {
            return await getPaymentsByUserId(userId)
        }
    }
}