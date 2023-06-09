import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
} from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
);

router.get('/:id', AcademicSemesterController.getSingleAcademicSemesters);
router.patch(
  '/:id',
  validateRequest(updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateAcademicSemester
);
router.delete('/:id', AcademicSemesterController.deleteAcademicSemester);

router.get('/', AcademicSemesterController.getAllAcademicSemesters);

export default router;
