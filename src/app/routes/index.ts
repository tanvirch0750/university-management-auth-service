import express, { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import academicSemesterRouters from '../modules/academicSemester/academicSemester.route';
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
];

// Application Routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

// Error Route
router.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(`Invalid URL! Can't find ${req.originalUrl}`, 404));
});

export default router;
