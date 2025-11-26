import { Router } from "express";
import { DoctorScheduleController } from "./doctorSchedule.controller";


const router = Router();

router.post(
     "/",
//     auth(UserRole.DOCTOR),
     DoctorScheduleController.insertIntoDB
)

export const doctorScheduleRoutes = router;