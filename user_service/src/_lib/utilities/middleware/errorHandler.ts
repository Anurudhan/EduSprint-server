import { Request, Response, NextFunction } from "express";
import { CustomError } from "../common/CustomError";


export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message,
    status: statusCode,
  });
};
