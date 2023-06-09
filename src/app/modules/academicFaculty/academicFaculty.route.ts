import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import {
  createAcademicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
} from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(createAcademicFacultyZodSchema),
  AcademicFacultyController.createAcademicFaculty
);
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);

router.patch(
  '/:id',
  validateRequest(updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateAcademicFaculty
);
router.delete('/:id', AcademicFacultyController.deleteAcademicFeculty);

router.get('/', AcademicFacultyController.getAllAcademicFaculty);

export default router;
