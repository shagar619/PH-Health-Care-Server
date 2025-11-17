/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express"
import httpStatus from "http-status"

const globalErrorHandler = (err: any, req: Request, res: Response) => {

     let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
     let success = false;
     let message = err.message || "Something went wrong!";
     let error = err;

     res.status(statusCode).json({
          success,
          message,
          error
     })
};

export default globalErrorHandler;