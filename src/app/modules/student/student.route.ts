import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { StudentController } from './student.controller';
import { updateStudentZodSchema } from './student.validation';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
//router.delete('/:id', StudentController.deleteStudent);
router.patch(
  '/:id',
  validateRequest(updateStudentZodSchema),
  StudentController.updateStudent
);
router.get('/', StudentController.getAllStudents);

export default router;
