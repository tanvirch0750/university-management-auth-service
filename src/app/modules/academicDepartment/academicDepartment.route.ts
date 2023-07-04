import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
} from './academicDepartment.validation';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(createAcademicDepartmentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.createAcademicDepartment
);
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);

router.patch(
  '/:id',
  validateRequest(updateAcademicDepartmentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicDepartmentController.updateAcademicDepartment
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicDepartmentController.deleteAcademicDepartment
);

router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

export default router;
