import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import StatusCode from "http-status-codes";
import { MetaService } from "./meta.service";
import { IAuthUser } from "../../interfaces/common";


const fetchDashboardMetaData = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

     const user = req.user;

     const result = await MetaService.fetchDashboardMetaData(user as IAuthUser);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: "Meta data retrial successfully!",
          data: result
     });
});

export const MetaController = {
     fetchDashboardMetaData
}