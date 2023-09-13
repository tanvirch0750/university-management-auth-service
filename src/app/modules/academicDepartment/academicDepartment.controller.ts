import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academeicDepartmentFilterableFields } from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interfaces';
import { AcademicDepartmentServices } from './academicDepartment.services';

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const department = req.body;
    const result =
      await AcademicDepartmentServices.createAcademicDepartmentToDB(department);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Academic department created successfully',
      data: result,
    });
  }
);

const getAllAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const filters = pick(req.query, academeicDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result =
      await AcademicDepartmentServices.getAllAcademicDepartmentFromDB(
        filters,
        paginationOptions
      );

    if (result.data.length === 0) {
      return next(new ApiError('No department found!', httpStatus.NOT_FOUND));
    }

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Department retrived successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const result =
      await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(id);

    if (!result) {
      return next(
        new ApiError(
          `No department found with this ${id} id`,
          httpStatus.NOT_FOUND
        )
      );
    }

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Department retrived successfully',
      data: result,
    });
  }
);

const updateAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;
    const updatedData = req.body;

    const result =
      await AcademicDepartmentServices.updateSingleAcademicDepartmentToDB(
        id,
        updatedData
      );

    if (!result) {
      return next(new ApiError(`No department found with this ID`, 404));
    }

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Department updated successfully',
      data: result,
    });
  }
);

const deleteAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const id = req.params.id;

    const result =
      await AcademicDepartmentServices.deleteAcademicDepartmentFromDB(id);

    if (!result) {
      return next(
        new ApiError(
          `No department found with this ${id} id`,
          httpStatus.NOT_FOUND
        )
      );
    }

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      status: 'success',
      message: 'Department deleted successfully !',
      data: result,
    });
  }
);

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
};
