import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { Router } from "express";
import { ReviewController } from "./review.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewValidation } from "./review.validation";



const router = Router();



router.get(
     '/', 
     ReviewController.getAllFromDB
);

router.post(
     '/',
     auth(UserRole.PATIENT),
     validateRequest(ReviewValidation.create),
     ReviewController.insertIntoDB
);


export const ReviewRoutes = router;