import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import userRouters from './app/modules/users/users.route';
const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application Routs
app.use('/api/v1/users', userRouters);

//Testing
app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully');
});

export default app;
