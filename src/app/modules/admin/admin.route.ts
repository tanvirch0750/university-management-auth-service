import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { updateAdminZodSchema } from './admin.validation';

const router = express.Router();

router.get('/:id', AdminController.getSingleAdmin);
//router.delete('/:id', StudentController.deleteStudent);
router.patch(
  '/:id',
  validateRequest(updateAdminZodSchema),
  AdminController.updateAdmin
);
router.get('/', AdminController.getAllAdmins);

export default router;
