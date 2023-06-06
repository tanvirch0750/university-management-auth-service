import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { createUserToDB } from './user.services';

export const createUser: RequestHandler = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await createUserToDB(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'User created successfully',
    data: result,
  });
});
