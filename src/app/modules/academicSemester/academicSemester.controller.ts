import { RequestHandler } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { createAcademicSemisterToDB } from './academicSemester.services';

export const createAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const academicSemester = req.body;
    const result = await createAcademicSemisterToDB(academicSemester);

    res.status(200).json({
      success: true,
      status: 'success',
      message: 'Academic semester created successfully',
      data: result,
    });
  }
);
