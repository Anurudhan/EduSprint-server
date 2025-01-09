import { IDependencies } from "../../application/interface/IDependencie"
import { createPaymentController } from "./createPaymentController"
import { createPaymentSessionController } from "./createPaymentSessionController"
import { getAllPaymentsController } from "./getAllPaymentController"
import { getPaymentsByUserIdController } from "./getPaymentsByUserIdController"

export const controllers = (dependencies: IDependencies) => {
    return {
        createSession: createPaymentSessionController(dependencies),
        createPayment: createPaymentController(dependencies),
        getAllPayments:getAllPaymentsController(dependencies),
        getPaymentsById:getPaymentsByUserIdController(dependencies)
    }
}