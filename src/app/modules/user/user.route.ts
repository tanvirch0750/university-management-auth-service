import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { createUserZodSchema } from './user.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createUserZodSchema),
  UserController.createStudent
);

export default router;
