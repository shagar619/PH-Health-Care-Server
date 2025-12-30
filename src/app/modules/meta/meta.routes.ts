import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { Router } from "express";
import { MetaController } from "./meta.controller";


const router = Router();

router.get(
     '/',
     auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
     MetaController.fetchDashboardMetaData
)


export const MetaRoutes = router;