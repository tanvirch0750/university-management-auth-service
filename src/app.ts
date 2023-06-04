import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import userRouters from './app/modules/users/users.route';
import ApiError from './errors/ApiError';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routs
app.use('/api/v1/users', userRouters);

//Testing route
app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully');
});

// Error Route
app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 404));
});

// global error handaler
app.use(globalErrorHandler);

export default app;
