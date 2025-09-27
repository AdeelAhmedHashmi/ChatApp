import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });
};

export default errorHandler;
