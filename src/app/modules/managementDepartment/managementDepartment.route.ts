import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
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
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ManagementDepartmentController.createManagementDepartment
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  ManagementDepartmentController.getSingleManagementDepartment
);

router.patch(
  '/:id',
  validateRequest(updateManagementDepartmentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  ManagementDepartmentController.updateManagementDepartment
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  ManagementDepartmentController.deleteManagementDepartment
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  ManagementDepartmentController.getAllManagementDepartment
);

export default router;
