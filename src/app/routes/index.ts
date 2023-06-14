import express, { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import academicDepartmentRouters from '../modules/academicDepartment/academicDepartment.route';
import academicFacultyRouters from '../modules/academicFaculty/academicFaculty.route';
import academicSemesterRouters from '../modules/academicSemester/academicSemester.route';
import facultyRouters from '../modules/faculty/faculty.route';
import managementDepartmentRouters from '../modules/managementDepartment/managementDepartment.route';
import studentRouters from '../modules/student/student.route';
import userRouters from '../modules/user/user.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRouters,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRouters,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRouters,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRouters,
  },
  {
    path: '/user/student',
    route: studentRouters,
  },
  {
    path: '/user/faculty',
    route: facultyRouters,
  },
  {
    path: '/management-department',
    route: managementDepartmentRouters,
  },
];

// Application Routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

// Error Route
router.use('*', (req: Request, res: Response, next: NextFunction) => {
  const message = 'Not Found';
  const errorObjs = [
    {
      path: `${req.originalUrl}`,
      message: `Invalid URL! API not found`,
    },
  ];
  next(new ApiError(message, httpStatus.NOT_FOUND, errorObjs));
});

export default router;
