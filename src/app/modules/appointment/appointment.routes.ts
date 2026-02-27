import { Router } from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { AppointmentController } from "./appointment.controller";
import { paymentLimiter } from "../../middlewares/rateLimiter";
import validateRequest from "../../middlewares/validateRequest";
import { AppointmentValidation } from "./appointment.validation";


const router = Router();


/**
 * ENDPOINT: /appointment/
 * 
 * Get all appointment with filtering
 * Only accessible for Admin & Super Admin
 */


router.get(
     '/',
     auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
     AppointmentController.getAllFromDB
);

router.get(
     "/my-appointment",
     auth(UserRole.PATIENT, UserRole.DOCTOR),
     AppointmentController.getMyAppointment
);

router.post(
     "/",
     auth(UserRole.PATIENT),
     paymentLimiter,
     validateRequest(AppointmentValidation.createAppointment),
     AppointmentController.createAppointment
);


router.post(
     '/pay-later',
     auth(UserRole.PATIENT),
     validateRequest(AppointmentValidation.createAppointment),
     AppointmentController.createAppointmentWithPayLater
);


router.post(
     '/:id/initiate-payment',
     auth(UserRole.PATIENT),
     paymentLimiter,
     AppointmentController.initiatePayment
);


router.patch(
     "/status/:id",
     auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR),
     AppointmentController.updateAppointmentStatus
);


export const AppointmentRoutes = router;