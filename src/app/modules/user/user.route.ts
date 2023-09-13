import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import {
  createAdminZodSchema,
  createFacultyZodSchema,
  createStudentZodSchema,
} from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createFaculty
);

router.post(
  '/create-admin',
  validateRequest(createAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin
);

export default router;
