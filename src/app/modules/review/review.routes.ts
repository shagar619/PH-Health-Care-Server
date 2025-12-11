import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { Router } from "express";
import { ReviewController } from "./review.controller";


const router = Router();

router.get(
     '/', 
     ReviewController.getAllFromDB
);

router.post(
     '/',
     auth(UserRole.PATIENT),
     ReviewController.insertIntoDB
);


export const ReviewRoutes = router;