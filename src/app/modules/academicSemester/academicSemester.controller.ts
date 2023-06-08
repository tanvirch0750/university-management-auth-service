import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academeicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import {
  createAcademicSemisterToDB,
  getAllAcademicSemestersFromDB,
} from './academicSemester.services';

export const createAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
    const academicSemester = req.body;
    const result = await createAcademicSemisterToDB(academicSemester);

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Academic semester created successfully',
      data: result,
    });
  }
);

export const getAllAcademicSemesters: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters = pick(req.query, academeicSemesterFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await getAllAcademicSemestersFromDB(
      filters,
      paginationOptions
    );

    if (result.data.length === 0) {
      return next(new ApiError('No semesters found!', httpStatus.NOT_FOUND));
    }

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Semesters retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);
