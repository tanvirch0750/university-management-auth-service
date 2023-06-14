import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import { StudentServices } from './student.services';

const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await StudentServices.getAllStudentsFromDB(
    filters,
    paginationOptions
  );

  if (result.data.length === 0) {
    return next(new ApiError('No Student found!', httpStatus.NOT_FOUND));
  }

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Students retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await StudentServices.getSingleStudentFromDB(id);

  if (!result) {
    return next(
      new ApiError(`No Student found with this ${id} id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Student retrived successfully',
    data: result,
  });
});

const updateStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await StudentServices.updateStudentToDB(id, updatedData);

  if (!result) {
    return next(new ApiError(`No student found with this ID`, 404));
  }

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Student updated successfully',
    data: result,
  });
});

const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const result = await StudentServices.deleteStudentFromDB(id);

  if (!result) {
    return next(
      new ApiError(`No studnet found with this ${id} id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Semester deleted successfully !',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
