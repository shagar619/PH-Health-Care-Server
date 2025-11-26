/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";

const globalErrorHandler = (
     err: any,
     req: Request,
     res: Response,
     next: NextFunction
) => {

     let statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
     let message = err.message || "Something went wrong!";
     let errors: any = [];
     let success = false;



     /**
     * -------------------------
     *  Zod Validation Error
     * -------------------------
     */
     if (err instanceof ZodError) {
          statusCode = httpStatus.BAD_REQUEST;
          message = "Validation Error";
          errors = err.issues.map((e) => ({
               path: e.path.join("."),
               message: e.message,
     }));
     }



     /**
     * -------------------------
     *  Prisma Validation Error
     * -------------------------
     */
     else if (err.name === "PrismaClientValidationError") {
          statusCode = httpStatus.BAD_REQUEST;
          message = "Validation Error";
          errors.push({ message: err.message });
     }


     /**
     * -------------------------
     *  Prisma Known Errors
     * -------------------------
     */
     else if (err.name === "PrismaClientKnownRequestError") {
          // Handle unique constraint violation
          if (err.code === "P2002") {
               statusCode = httpStatus.CONFLICT;
               message = "Duplicate field value entered";
               errors.push({ message: err.message });
          }

          // Handle foreign key constraint violation
          else if (err.code === "P2003") {
               statusCode = httpStatus.BAD_REQUEST;
               message = "Foreign key constraint violation";
               errors.push({ message: err.message });
          }

          // Authentication failure
          else if (err.code === "P1012") {
               statusCode = httpStatus.UNAUTHORIZED;
               message = "Authentication failed";
               errors.push({ message: err.message });
          }

          // Database connection error
          else if (err.code === "P1000") {
               statusCode = httpStatus.SERVICE_UNAVAILABLE;
               message = "Database connection error";
               errors.push({ message: err.message });
          }
     }

          /**
     * -------------------------
     *  Prisma unknown Errors
     * -------------------------
     */
     else if (err.name === "PrismaClientUnknownRequestError") {
          statusCode = httpStatus.INTERNAL_SERVER_ERROR;
          message = "An unknown error occurred with the database";
          errors.push({ message: err.message });
     }

          /**
     * -------------------------
     *  Prisma Initialization Error
     * -------------------------
     */
     else if (err.name === "PrismaClientInitializationError") {
          statusCode = httpStatus.INTERNAL_SERVER_ERROR;
          message = "Prisma Client Initialization Error";
          errors.push({ message: err.message });
     }







res.status(statusCode).json({
     success,
     message,
     errors 
});
};

export default globalErrorHandler;
