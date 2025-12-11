import { UserRole } from "@prisma/client";
import auth from "../../middlewares/auth";
import { Router } from "express";


const router = Router();

router.get(
     '/',
     auth(UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
     MetaController.fetchDashboardMetaData
)


export const MetaRoutes = router;