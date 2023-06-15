import express from 'express';
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
  UserController.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  UserController.createFaculty
);

router.post(
  '/create-admin',
  validateRequest(createAdminZodSchema),
  UserController.createAdmin
);

export default router;
