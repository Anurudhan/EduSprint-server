import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../app/interfaces/IDependencies";
import { httpStatusCode } from "../../_lib/common";
import { Types } from "mongoose";

export const getChatUsersByIdsController = (dependencies: IDependencies) => {
    const { usecases: { getChatUsersByIdsUseCase } } = dependencies;

    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const ids = req.query.ids && typeof req.query.ids === "string" 
                ? req.query.ids.split(',').map(id => new Types.ObjectId(id)) // Convert to ObjectId[]
                : [];
            if(!ids) res.json({success:false,data:null,message:"The Ids not provides"}).status(httpStatusCode.UNAUTHORIZED)
            const result = await getChatUsersByIdsUseCase(dependencies).execute(ids);
        if(!result) res.json({success:false,data:null,message:"the chat users receiving failed"}).status(httpStatusCode.UNAUTHORIZED)
            res.json({success:true,data:result,message:"the chat users received successfully"}).status(httpStatusCode.OK);
        } catch (error) {
            next(error);
        }
    };
};
