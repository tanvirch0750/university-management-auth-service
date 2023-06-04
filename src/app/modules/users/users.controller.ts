import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { createUserToDB } from './users.services';

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const { user } = req.body;
  const result = await createUserToDB(user);

  res.status(200).json({
    success: true,
    status: 'success',
    message: 'User created successfully',
    data: result,
  });
});
