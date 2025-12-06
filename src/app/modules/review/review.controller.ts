import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { IJWTPayload } from "../../types/common";
import sendResponse from "../../shared/sendResponse";
import StatusCode from "http-status-codes";


const insertIntoDB = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

     const user = req.user;
     const result = await ReviewService.insertIntoDB(user as IJWTPayload, req.body);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: 'Review created successfully',
          data: result,
     });
});

export const ReviewController = {
     insertIntoDB
}