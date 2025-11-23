import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";
import StatusCodes from "http-status-codes";


const createPatient = catchAsync(async (req: Request, res: Response) => {

     const result = await UserService.createPatient(req);

     sendResponse(res, {
          statusCode: StatusCodes.CREATED,
          success: true,
          message: "Patient created successfully!",
          data: result
     })
});


const createAdmin = catchAsync(async (req: Request, res: Response) => {

     const result = await UserService.createAdmin(req);
     sendResponse(res, {
          statusCode: StatusCodes.CREATED,
          success: true,
          message: "Admin Created successfuly!",
          data: result
     })
});


const createDoctor = catchAsync(async (req: Request, res: Response) => {

     const result = await UserService.createDoctor(req);
     sendResponse(res, {
          statusCode: StatusCodes.CREATED,
          success: true,
          message: "Doctor Created successfully!",
          data: result
     })
});


export const UserController = {
     createPatient,
     createAdmin,
     createDoctor
}