import { PaymentEntity } from "../../domain/entities";
import { IDependencies } from "../interface/IDependencie";


export const createPaymentUseCase = (dependencies: IDependencies) => {

    const {
        repositories: { createPayment }
    } = dependencies;

    return {
        execute: async (data: PaymentEntity) => {
            return await createPayment(data);
        }
    }
};