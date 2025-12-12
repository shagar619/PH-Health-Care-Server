import { Request, Response } from "express";
import { IJWTPayload } from "../../types/common";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import StatusCode from "http-status-codes";
import { AppointmentService } from "./appointment.service";
import pick from "../../helper/pick";
import { appointmentFilterableFields } from "./appointment.constant";


const createAppointment = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

     const user = req.user;
     const result = await AppointmentService.createAppointment(user as IJWTPayload, req.body);

     sendResponse(res, {
          statusCode: StatusCode.CREATED,
          success: true,
          message: "Appointment created successfully!",
          data: result
     })
});



const getMyAppointment = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

     const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

     const fillters = pick(req.query, ["status", "paymentStatus"]);

     const user = req.user;

     const result = await AppointmentService.getMyAppointment(user as IJWTPayload, fillters, options);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: "Appointment fetched successfully!",
          data: result
     })
});



const updateAppointmentStatus = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

     const { id } = req.params;
     const { status } = req.body;
     const user = req.user;

     const result = await AppointmentService.updateAppointmentStatus(id, status, user as IJWTPayload);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: "Appointment updated successfully!",
          data: result
     })
});



const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

     const filters = pick(req.query, appointmentFilterableFields);

     const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

     const result = await AppointmentService.getAllFromDB(filters, options);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: 'Appointment retrieval successfully',
          meta: result.meta,
          data: result.data,
     });
});




export const AppointmentController = {
     createAppointment,
     getMyAppointment,
     updateAppointmentStatus,
     getAllFromDB
}