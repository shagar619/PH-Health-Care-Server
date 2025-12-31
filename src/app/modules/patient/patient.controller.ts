import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import pick from "../../helper/pick";
import { patientFilterableFields } from "./patient.constant";
import sendResponse from "../../shared/sendResponse";
import StatusCode from "http-status-codes";
import { PatientService } from "./patient.service";




const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

     const filters = pick(req.query, patientFilterableFields);

     const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

     const includeHealthData = req.query.includeHealthData === 'true';

     const result = await PatientService.getAllFromDB(filters, options, includeHealthData);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: 'Patient retrieval successfully',
          meta: result.meta,
          data: result.data,
     });
});




const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {

     const { id } = req.params;

     const result = await PatientService.getByIdFromDB(id);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: 'Patient retrieval successfully',
          data: result,
     });
});




const softDelete = catchAsync(async (req: Request, res: Response) => {

     const { id } = req.params;

     const result = await PatientService.softDelete(id);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: 'Patient soft deleted successfully',
          data: result,
     });
});





const deleteFromDB = catchAsync(async (req: Request, res: Response) => {

     const { id } = req.params;

     const result = await PatientService.deleteFromDB(id);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: 'Patient deleted successfully',
          data: result,
     });
});





const updateIntoDB = catchAsync(async (req: Request, res: Response) => {

     const { id } = req.params;

     const result = await PatientService.updateIntoDB(id, req.body);

     sendResponse(res, {
          statusCode: StatusCode.OK,
          success: true,
          message: 'Patient updated successfully',
          data: result,
     });
});




export const PatientController = {
     getAllFromDB,
     getByIdFromDB,
     softDelete,
     updateIntoDB,
     deleteFromDB
};