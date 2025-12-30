import StatusCodes from "http-status-codes";
import sendResponse from "../../shared/sendResponse";
import catchAsync from "../../shared/catchAsync";
import { Request, Response } from "express";
import { DoctorScheduleService } from "./doctorSchedule.service";
import pick from "../../helper/pick";
import { scheduleFilterableFields } from "./doctorSchedule.constant";
import { IAuthUser } from "../../interfaces/common";




const insertIntoDB = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

     const user = req.user;

     const result = await DoctorScheduleService.insertIntoDB(user as IAuthUser, req.body);

     sendResponse(res, {
          statusCode: StatusCodes.CREATED,
          success: true,
          message: "Doctor Schedule created successfully!",
          data: result
     });
});





const getMySchedule = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

     const filters = pick(req.query, ['startDate', 'endDate', 'isBooked']);

     const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

     const user = req.user;

     const result = await DoctorScheduleService.getMySchedule(filters, options, user as IAuthUser);

     sendResponse(res, {
          statusCode: StatusCodes.OK,
          success: true,
          message: "My Schedule fetched successfully!",
          data: result
     });
});



const deleteFromDB = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

     const user = req.user;

     const { id } = req.params;

     const result = await DoctorScheduleService.deleteFromDB(user as IAuthUser, id);

     sendResponse(res, {
          statusCode: 
          StatusCodes.OK,
          success: true,
          message: "My Schedule deleted successfully!",
          data: result
     });
});



const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

     const filters = pick(req.query, scheduleFilterableFields);

     const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

     const result = await DoctorScheduleService.getAllFromDB(filters, options);

     sendResponse(res, {
          statusCode: 
          StatusCodes.OK,
          success: true,
          message: 'Doctor Schedule retrieval successfully',
          meta: result.meta,
          data: result.data,
     });
});

export const DoctorScheduleController = {
     insertIntoDB,
     getMySchedule,
     deleteFromDB,
     getAllFromDB
}