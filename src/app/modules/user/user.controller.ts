import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserServices } from './user.services';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { student, ...userData } = req.body;
  const result = await UserServices.createStudentToDB(student, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Student created successfully',
    data: result,
  });
});

const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { faculty, ...userData } = req.body;
  const result = await UserServices.createFacultyToDB(faculty, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Faculty created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
};
