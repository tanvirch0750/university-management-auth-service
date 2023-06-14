import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { updateFacultyZodSchema } from './faculty.validation';

const router = express.Router();

router.get('/:id', FacultyController.getSingleFaculty);
//router.delete('/:id', StudentController.deleteStudent);
router.patch(
  '/:id',
  validateRequest(updateFacultyZodSchema),
  FacultyController.updateFaculty
);
router.get('/', FacultyController.getAllFaculties);

export default router;
