import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import {
  createManagementDepartmentZodSchema,
  updateManagementDepartmentZodSchema,
} from './managementDepartment.validation';

const router = express.Router();

router.post(
  '/create-management-department',
  validateRequest(createManagementDepartmentZodSchema),
  ManagementDepartmentController.createManagementDepartment
);
router.get(
  '/:id',
  ManagementDepartmentController.getSingleManagementDepartment
);

router.patch(
  '/:id',
  validateRequest(updateManagementDepartmentZodSchema),
  ManagementDepartmentController.updateManagementDepartment
);
router.delete(
  '/:id',
  ManagementDepartmentController.deleteManagementDepartment
);

router.get('/', ManagementDepartmentController.getAllManagementDepartment);

export default router;
