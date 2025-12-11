import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IJWTPayload } from "../../types/common";
import StatusCode from "http-status-codes";


const fetchDashboardMetaData = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

     const user = req.user;
     const result = await MetaService.fetchDashboardMetaData(user as IJWTPayload);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: "Meta data retrival successfully!",
          data: result
     })
});

export const MetaController = {
     fetchDashboardMetaData
}