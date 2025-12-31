import { Router } from "express";
import { ScheduleController } from "./schedule.controller";
import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";



const router = Router();



router.get(
     '/',
     auth(UserRole.DOCTOR, UserRole.ADMIN, UserRole.SUPER_ADMIN),
     ScheduleController.getAllFromDB
);

/**
 * API ENDPOINT: /schedule/:id
 * 
 * Get schedule data by id
*/

// router.get(
//      "/",
//      auth(UserRole.DOCTOR, UserRole.ADMIN),
//      ScheduleController.schedulesForDoctor
// )


router.get(
     '/:id',
     auth(UserRole.ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
     ScheduleController.getByIdFromDB
);


router.post(
     "/",
     auth(UserRole.ADMIN),
     ScheduleController.insertIntoDB
);


router.delete(
     "/:id",
     auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
     ScheduleController.deleteScheduleFromDB
);


/**
 * API ENDPOINT: /schedule/:id
 * 
 * Delete schedule data by id
 */


export const ScheduleRoutes = router;