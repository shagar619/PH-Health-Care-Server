import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { IJWTPayload } from "../../types/common";
import sendResponse from "../../shared/sendResponse";
import StatusCode from "http-status-codes";


const createPrescription = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

     const user = req.user;
     const result = await PrescriptionService.createPrescription(user as IJWTPayload, req.body);

     sendResponse(res, {
          statusCode: StatusCode.CREATED,
          success: true,
          message: "prescription created successfully!",
          data: result
     })
})

export const PrescriptionController = {
     createPrescription
}