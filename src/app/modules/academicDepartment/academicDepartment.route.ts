import express from 'express';
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
  AcademicDepartmentController.createAcademicDepartment
);
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);

router.patch(
  '/:id',
  validateRequest(updateAcademicDepartmentZodSchema),
  AcademicDepartmentController.updateAcademicDepartment
);
router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);

router.get('/', AcademicDepartmentController.getAllAcademicDepartment);

export default router;
