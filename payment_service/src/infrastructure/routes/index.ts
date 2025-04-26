import { Router } from "express";
import { IDependencies } from "../../application/interface/IDependencie";
import { controllers } from "../../presentation/controllers";
import { protectRouter } from "../../_lib/middleware/protectRouter";


export const routes = (dependencie:IDependencies)=>{
    const { createSession,createPayment,getAllPayments,getPaymentsById } =
		controllers(dependencie);
    const router=Router();

    router.route("/payment/session").post(protectRouter(),createSession);
    router.route("/payment/").post(protectRouter(),createPayment).get(protectRouter(),getAllPayments);
    router.route("/payment/userPayments/:userId").get(protectRouter(),getPaymentsById)

    return router
}