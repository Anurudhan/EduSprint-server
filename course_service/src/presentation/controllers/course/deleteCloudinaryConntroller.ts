import { NextFunction, Request, Response } from "express";
import { httpStatusCode } from "../../../_lib/http";
import cloudinary from "../../../_lib/http/cloudinary";

export const deleteCloudinaryConntroller = () =>{
    return async(req:Request,res:Response,next:NextFunction)=>{
        const { publicId, resourceType } = req.body;

        if (!publicId || !resourceType) {
          res.status(httpStatusCode.UNAUTHORIZED).json({ message: 'Missing required fields' });
        }
      
        try {
          const result = await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType, // 'image' or 'video'
          });
      
          if (result.result === 'ok' || result.result === 'not found') {
            res.status(httpStatusCode.OK).json({ message: 'Deleted successfully' });
          } else {
            res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Deletion failed', result });
          }
        } catch (error) {
          console.error("Cloudinary deletion error:", error);
          res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
        }
    }
}