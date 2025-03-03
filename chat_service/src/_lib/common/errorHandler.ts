import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 400;
  res.status(statusCode).json({
    success: false,
    status: err.statusCode,
    message: err.message || "Something went wrong",
  });
};

export default errorHandler;