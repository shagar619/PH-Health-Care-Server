import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { Router } from "express";


const router = Router();

router.post(
     '/',
     auth(UserRole.PATIENT),
     ReviewController.insertIntoDB
);


export const ReviewRoutes = router;