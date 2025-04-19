import { NextFunction, Request, Response } from "express"
import { httpStatusCode, UserPayload } from "./common";
import Jwt from "jsonwebtoken";

export const Verify_token = ()=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        const {access_token,refresh_token} = req.cookies;
        let user:UserPayload|null =  null; 
        if(access_token) user= Jwt.verify(access_token,"GHJKAL") as UserPayload
        else if(refresh_token){
             user= Jwt.verify(refresh_token,"GHJKRL") as UserPayload
             if(user){
                const access_token = generate_token({user,isRefresh:false})
                res.cookie("access_token",access_token,{httpOnly:true,secure:true,sameSite:"none"})
             }
        }
        if(!user) res.status(httpStatusCode.UNAUTHORIZED)
        else res.status(httpStatusCode.OK)
    }
}

const generate_token = ({user,isRefresh}:{user:UserPayload,isRefresh:false})=>{
    if(isRefresh) return Jwt.sign(user,"GHJKRL",{expiresIn:"15d"})
        else return Jwt.sign(user,"GHJKAL",{expiresIn:"15m"})
}

