import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import academicSemesterRouters from './app/modules/academicSemester/academicSemester.route';
import userRouters from './app/modules/user/user.route';
import ApiError from './errors/ApiError';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routs
app.use('/api/v1/users', userRouters);
app.use('/api/v1/academic-semesters', academicSemesterRouters);

//Testing route
app.get('/', async (req: Request, res: Response) => {
  res.send('Working Successfully');
});

// Error Route
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(`Invalid URL! Can't find ${req.originalUrl}`, 404));
});

// global error handaler
app.use(globalErrorHandler);

export default app;
