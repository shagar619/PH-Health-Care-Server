import { Router } from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";
import { DoctorScheduleValidation } from "./doctorSchedule.validation";


const router = Router();

router.post(
     "/",
     auth(UserRole.DOCTOR),
     validateRequest(DoctorScheduleValidation.createDoctorScheduleValidationSchema),
     DoctorScheduleController.insertIntoDB
)

router.get(
     '/my-schedule',
     auth(UserRole.DOCTOR),
     DoctorScheduleController.getMySchedule
)

router.post(
     "/",
     auth(UserRole.DOCTOR),
     validateRequest(DoctorScheduleValidation.createDoctorScheduleValidationSchema),
     DoctorScheduleController.insertIntoDB
)

router.delete(
     '/:id',
     auth(UserRole.DOCTOR),
     DoctorScheduleController.deleteFromDB
);




export const doctorScheduleRoutes = router;