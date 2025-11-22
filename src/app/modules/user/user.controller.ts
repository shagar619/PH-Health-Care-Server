import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";
import StatusCodes from "http-status-codes";


const createPatient = catchAsync(async (req: Request, res: Response) => {

     const result = await UserService.createPatient(req.body);

     sendResponse(res, {
          statusCode: StatusCodes.CREATED,
          success: true,
          message: "Patient created successfully!",
          data: result
     })
})

export const UserController = {
     createPatient
}