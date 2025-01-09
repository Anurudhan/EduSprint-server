import { Router } from "express";
import { IDependencies } from "../../application/interface/IDependencie";
import { controllers } from "../../presentation/controllers";


export const routes = (dependencie:IDependencies)=>{
    const { createSession,createPayment,getAllPayments,getPaymentsById } =
		controllers(dependencie);
    const router=Router();

    router.route("/session").post(createSession);
    router.route("/").post(createPayment).get(getAllPayments);
    router.route("/userPayments/:userId").get(getPaymentsById)

    return router
}