import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { createAcademicSemester } from './academicSemester.controller';
import { createAcademicSemesterZodSchema } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  createAcademicSemester
);

export default router;
