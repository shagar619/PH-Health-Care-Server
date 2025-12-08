/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { jwtHelper } from "../helper/jwtHelper";
import StatusCode from "http-status-codes";
import ApiError from "../errors/ApiError";
import config from "../../config";
import { Secret } from "jsonwebtoken";



const auth = (...roles: string[]) => {

     return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
     try {

     const token = req.cookies.accessToken;

     if (!token) {
          throw new ApiError(StatusCode.UNAUTHORIZED, "You are not logged in!");
     }

     const verifyUser = jwtHelper.verifyToken(token, config.jwt.jwt_secret as Secret);

     req.user = verifyUser;

     if (roles.length && !roles.includes(verifyUser.role)) {
          throw new ApiError(StatusCode.FORBIDDEN, "You are not authorized!");
     }

          next();
     }
     catch (err) {
          next(err)
     }
}
}

export default auth;