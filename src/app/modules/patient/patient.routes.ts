import { Router } from "express";


const router = Router();

router.get(
     '/',
     PatientController.getAllFromDB
);

router.get(
     '/:id',
     PatientController.getByIdFromDB
);

router.patch(
     '/',
     auth(UserRole.PATIENT),
     PatientController.updateIntoDB
);

router.delete(
     '/soft/:id',
     PatientController.softDelete
);

export const PatientRoutes = router;