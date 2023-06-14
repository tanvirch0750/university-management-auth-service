import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { createFacultyZodSchema, createUserZodSchema } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createUserZodSchema),
  UserController.createStudent
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  UserController.createFaculty
);

export default router;
