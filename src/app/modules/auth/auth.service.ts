import { UserStatus } from "@prisma/client"
import { prisma } from "../../shared/prisma"
import bcrypt from "bcryptjs";
import { jwtHelper } from "../../helper/jwtHelper";
import StatusCode from "http-status-codes";
import ApiError from "../../errors/ApiError";
import config from "../../../config";
import { Secret } from "jsonwebtoken";



const login = async (payload: { email: string, password: string }) => {

     const user = await prisma.user.findUniqueOrThrow({
     where: {
          email: payload.email,
          status: UserStatus.ACTIVE
     }
     })

     const isCorrectPassword = await bcrypt.compare(payload.password, user.password);

     if (!isCorrectPassword) {
          throw new ApiError(StatusCode.UNAUTHORIZED, "Invalid login credentials");
     }

     const accessToken = jwtHelper.generateToken({ email: user.email, role: user.role }, "abcd", "30d");

     const refreshToken = jwtHelper.generateToken({ email: user.email, role: user.role }, "abcdefgh", "90d");

     return {
          accessToken,
          refreshToken,
          needPasswordChange: user.needPasswordChange
     }
}


const refreshToken = async (token: string) => {

     let decodedData;
     try {
          decodedData = jwtHelper.verifyToken(token, config.jwt.refresh_token_secret as Secret);
     }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
     catch (err) {
          throw new Error("You are not authorized!")
     }

     const userData = await prisma.user.findUniqueOrThrow({
     where: {
          email: decodedData.email,
          status: UserStatus.ACTIVE
     }
     });

     const accessToken = jwtHelper.generateToken({
          email: userData.email,
          role: userData.role
     },
     config.jwt.jwt_secret as Secret,
     config.jwt.expires_in as string
     );

     return {
          accessToken,
          needPasswordChange: userData.needPasswordChange
     };

};

export const AuthService = {
     login,
     refreshToken
}