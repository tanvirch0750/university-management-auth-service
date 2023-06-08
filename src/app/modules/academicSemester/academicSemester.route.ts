import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createAcademicSemester,
  getAllAcademicSemesters,
} from './academicSemester.controller';
import { createAcademicSemesterZodSchema } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  createAcademicSemester
);

router.get('/', getAllAcademicSemesters);

export default router;
