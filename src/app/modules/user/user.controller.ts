import { RequestHandler } from 'express';

import catchAsync from '../../../shared/catchAsync';
import { createUserToDB } from './user.services';

export const createUser: RequestHandler = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await createUserToDB(user);

  res.status(200).json({
    success: true,
    status: 'success',
    message: 'User created successfully',
    data: result,
  });
});
