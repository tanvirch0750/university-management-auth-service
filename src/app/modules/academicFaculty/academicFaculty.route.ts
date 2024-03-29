import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
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
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.createAcademicFaculty
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  AcademicFacultyController.getSingleAcademicFaculty
);

router.patch(
  '/:id',
  validateRequest(updateAcademicFacultyZodSchema),
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  AcademicFacultyController.updateAcademicFaculty
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  AcademicFacultyController.deleteAcademicFeculty
);

router.get(
  '/',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.SUPER_ADMIN
  ),
  AcademicFacultyController.getAllAcademicFaculty
);

export default router;
