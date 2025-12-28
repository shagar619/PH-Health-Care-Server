import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";
import StatusCodes from "http-status-codes";
import pick from "../../helper/pick";
import { IJWTPayload } from "../../types/common";
import { IAuthUser } from "../../interfaces/common";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

     const result = await ScheduleService.insertIntoDB(req.body);

     sendResponse(res, {
          statusCode: StatusCodes.CREATED,
          success: true,
          message: "Schedule created successfully!",
          data: result
     })
});


const getAllFromDB = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

     const filters = pick(req.query, ['startDate', 'endDate']);

     const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

     const user = req.user;

     const result = await ScheduleService.getAllFromDB(filters, options, user as IAuthUser);

     sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: "Schedule fetched successfully!",
          data: result.data,
          meta: result.meta
     });
});



const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {

     const { id } = req.params;
     const result = await ScheduleService.getByIdFromDB(id);

     sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: 'Schedule retrieval successfully',
          data: result,
     });
});



const schedulesForDoctor = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

     const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
     
     const filters = pick(req.query, ["startDateTime", "endDateTime"])

     const user = req.user;

     const result = await ScheduleService.schedulesForDoctor(user as IJWTPayload, filters, options);

     sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: "Schedule fetched successfully!",
          meta: result.meta,
          data: result.data
     })
});





const deleteScheduleFromDB = catchAsync(async (req: Request, res: Response) => {

     const result = await ScheduleService.deleteScheduleFromDB(req.params.id);

     sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: "Schedule Deleted successfully!",
          data: result
     })
});






export const ScheduleController = {
     insertIntoDB,
     schedulesForDoctor,
     deleteScheduleFromDB,
     getByIdFromDB,
     getAllFromDB
}
