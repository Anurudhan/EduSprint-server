import { IDependencies } from "../interface/IDependencie";

export const getAllPaymentUseCase = (dependencies: IDependencies) => {
    const { repositories: {getAllPayments} } = dependencies
    return {
        execute: async () => {
            return await getAllPayments()
        }
    }
}