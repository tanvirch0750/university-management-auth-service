import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { createAcademicSemisterToDB } from './academicSemester.services';

export const createAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const academicSemester = req.body;
    const result = await createAcademicSemisterToDB(academicSemester);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Academic semester created successfully',
      data: result,
    });

    // res.status(200).json({
    //   success: true,
    //   status: 'success',
    //   message: 'Academic semester created successfully',
    //   data: result,
    // });
  }
);
