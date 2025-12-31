import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import StatusCode from "http-status-codes";
import { AppointmentService } from "./appointment.service";
import pick from "../../helper/pick";
import { appointmentFilterableFields } from "./appointment.constant";
import { IAuthUser } from "../../interfaces/common";


const createAppointment = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

     const user = req.user;

     const result = await AppointmentService.createAppointment(user as IAuthUser, req.body);

     sendResponse(res, {
          statusCode: StatusCode.CREATED,
          success: true,
          message: "Appointment created successfully!",
          data: result
     });
});



const getMyAppointment = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

     const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

     const fillters = pick(req.query, ["status", "paymentStatus"]);

     const user = req.user;

     const result = await AppointmentService.getMyAppointment(user as IAuthUser, fillters, options);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: "Appointment fetched successfully!",
          data: result
     });
});



const updateAppointmentStatus = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

     const { id } = req.params;
     const { status } = req.body;
     const user = req.user;

     const result = await AppointmentService.updateAppointmentStatus(id, status, user as IAuthUser);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: "Appointment updated successfully!",
          data: result
     });
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




const createAppointmentWithPayLater = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
     const user = req.user;

     const result = await AppointmentService.createAppointmentWithPayLater(user as IAuthUser, req.body);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: "Appointment booked successfully! You can pay later.",
          data: result
     });
});




const initiatePayment = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {

     const user = req.user;
     const { id } = req.params;

     const result = await AppointmentService.initiatePaymentForAppointment(id, user as IAuthUser);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: "Payment session created successfully",
          data: result
     });
});



export const AppointmentController = {
     createAppointment,
     getMyAppointment,
     updateAppointmentStatus,
     getAllFromDB,
     createAppointmentWithPayLater,
     initiatePayment
}