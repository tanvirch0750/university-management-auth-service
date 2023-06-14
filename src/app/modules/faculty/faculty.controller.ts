import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './faculty.constant';
import { IFaculty } from './faculty.interface';
import { FacultyServices } from './faculty.services';

const getAllFaculties: RequestHandler = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await FacultyServices.getAllFacultiesFromDB(
    filters,
    paginationOptions
  );

  if (result.data.length === 0) {
    return next(new ApiError('No Faculty found!', httpStatus.NOT_FOUND));
  }

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Faculty retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await FacultyServices.getSingleFacultyFromDB(id);

  if (!result) {
    return next(
      new ApiError(`No faculty found with this ${id} id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Faculty retrived successfully',
    data: result,
  });
});

const updateFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await FacultyServices.updateFacultyToDB(id, updatedData);

  if (!result) {
    return next(new ApiError(`No faculy found with this ID`, 404));
  }

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Faculty updated successfully',
    data: result,
  });
});

const deleteFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const result = await FacultyServices.deleteFacultyFromDB(id);

  if (!result) {
    return next(
      new ApiError(`No faculty found with this ${id} id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Faculty deleted successfully !',
    data: result,
  });
});

export const FacultyController = {
  getAllFaculties,
  updateFaculty,
  getSingleFaculty,
  deleteFaculty,
};
