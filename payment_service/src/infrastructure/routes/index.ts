import { Router } from "express";
import { IDependencies } from "../../application/interface/IDependencie";
import { controllers } from "../../presentation/controllers";
import { protectRouter } from "../../_lib/middleware/protectRouter";


export const routes = (dependencie:IDependencies)=>{
    const { createSession,createPayment,getAllPayments,getPaymentsById } =
		controllers(dependencie);
    const router=Router();

    router.route("/session").post(protectRouter(),createSession);
    router.route("/").post(protectRouter(),createPayment).get(protectRouter(),getAllPayments);
    router.route("/userPayments/:userId").get(protectRouter(),getPaymentsById)

    return router
}