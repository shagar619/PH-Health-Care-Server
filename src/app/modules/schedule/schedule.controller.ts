import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ScheduleService } from "./schedule.service";
import StatusCodes from "http-status-codes";


const insertIntoDB = catchAsync(async (req: Request, res: Response) => {

     const result = await ScheduleService.insertIntoDB(req.body);

     sendResponse(res, {
          statusCode: StatusCodes.CREATED,
          success: true,
          message: "Schedule created successfully!",
          data: result
     })
});



export const ScheduleController = {
     insertIntoDB,
//     schedulesForDoctor,
//     deleteScheduleFromDB
}
