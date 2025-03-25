import { NextFunction, Request, Response } from "express";
import { updateBannerStatuses } from "../../../infrastructure/database/repositories/updateBannerStatuses";

// Create a middleware for banner status updates
export const updateBannerStatusMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    try {
      await updateBannerStatuses();
      next();
    } catch (error) {
      console.error('Error updating banner statuses:', error);
      next();  // Continue to the route even if status update fails
    }
  };
  